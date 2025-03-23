import {
  InstancedBuffer,
  rectToTriangles,
  Shader,
  uniformMat4,
  uniformVec4,
  VertexArray,
} from "@ryohey/webgl-react"
import { Rect } from "../../../../entities/geometry/Rect"

export interface INoteData {
  velocity: number
  isSelected: boolean
  colorId: number
}

export class NoteBuffer
  implements
    InstancedBuffer<(Rect & INoteData)[], "position" | "bounds" | "state">
{
  private _instanceCount: number = 0
  private boundsBuffer = new Float32Array(0)
  private stateBuffer = new Float32Array(0)

  constructor(
    readonly vertexArray: VertexArray<"position" | "bounds" | "state">,
  ) {
    this.vertexArray.updateBuffer(
      "position",
      new Float32Array(rectToTriangles({ x: 0, y: 0, width: 1, height: 1 })),
    )
  }

  update(rects: (Rect & INoteData)[]) {
    if (
      this.boundsBuffer.length < rects.length * 4 ||
      this.stateBuffer.length < rects.length * 3
    ) {
      this.boundsBuffer = new Float32Array(rects.length * 4)
      this.stateBuffer = new Float32Array(rects.length * 3)
    }

    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i]

      this.boundsBuffer[i * 4 + 0] = rect.x
      this.boundsBuffer[i * 4 + 1] = rect.y
      this.boundsBuffer[i * 4 + 2] = rect.width
      this.boundsBuffer[i * 4 + 3] = rect.height

      this.stateBuffer[i * 3 + 0] =
        rect.velocity === 126 ? 0.99 : rect.velocity / 127
      this.stateBuffer[i * 3 + 1] = rect.isSelected ? 1 : 0
      this.stateBuffer[i * 3 + 2] = rect.colorId
    }

    this.vertexArray.updateBuffer(
      "bounds",
      this.boundsBuffer.subarray(0, rects.length * 4),
    )
    this.vertexArray.updateBuffer(
      "state",
      this.stateBuffer.subarray(0, rects.length * 3),
    )

    this._instanceCount = rects.length
  }

  get vertexCount() {
    return 6
  }

  get instanceCount() {
    return this._instanceCount
  }
}

export const NoteShader = (gl: WebGL2RenderingContext) =>
  new Shader(
    gl,
    `#version 300 es
      precision lowp float;

      uniform mat4 projectionMatrix;

      in vec4 position;
      in vec4 bounds;  // [x, y, width, height]
      in vec3 state; // [velocity, isSelected, colorId]

      out vec4 vBounds;
      out vec2 vPosition;
      out vec3 vState;

      void main() {
        vec4 transformedPosition = vec4((position.xy * bounds.zw + bounds.xy), position.zw);
        gl_Position = projectionMatrix * transformedPosition;
        vBounds = bounds;
        vPosition = transformedPosition.xy;
        vState = state;
      }
    `,
    `#version 300 es
      precision lowp float;

      uniform vec4 strokeColor;
      uniform vec4 selectedColor;
      uniform vec4 inactiveColor;
      uniform vec4 activeColor;

      in vec4 vBounds;
      in vec2 vPosition;
      in vec3 vState;

      out vec4 outColor;

      void main() {
        float border = 1.0;
        float localX = vPosition.x - vBounds.x;
        float localY = vPosition.y - vBounds.y;

        float outlineTop = step(border, localY);
        float outlineBottom = step(localY, vBounds.w - border);
        float outlineLeft = step(border, localX);
        float outlineRight = step(localX, vBounds.z - border);
        
        float isOutline = outlineTop * outlineBottom * outlineLeft * outlineRight;

        vec4 myColor = activeColor;

        if (vState.z >= 1.0) {
          myColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
          
        if (vState.z >= 2.0) {
          myColor = vec4(0.0, 0.0, 1.0, 1.0);
        } 
          
        if (vState.z >= 3.0) {
          myColor = vec4(0.5, 0.0, 0.5, 1.0);
        }
        
        outColor = strokeColor;
        outColor = selectedColor;
        
        if (isOutline < 1.0) {
          // draw outline
          outColor = myColor;
        } else {
          // if selected, draw selected color
          // otherwise, draw color based on velocity by mixing active and inactive color
          outColor = mix(inactiveColor, myColor, vState.x);
        }


        if (vState.x == 0.99) {
          outColor = vec4(0.3, 0.2, 0.2, 0.5);
          //stripes
          if (int(vPosition.x) % 4 == 0) {
            outColor = mix(outColor, vec4(1.0, 1.0, 1.0, 1.0), 0.1);
          }

        }

        if (isOutline < 1.0) {
          outColor = myColor;
        }

        if (isOutline < 1.0 && vState.y >= 1.0) {
         outColor = vec4(1.0, 1.0, 1.0, 1.0);
        }




      }
    `,
    {
      position: { size: 2, type: gl.FLOAT },
      bounds: { size: 4, type: gl.FLOAT, divisor: 1 },
      state: { size: 3, type: gl.FLOAT, divisor: 1 },
    },
    {
      projectionMatrix: uniformMat4(),
      strokeColor: uniformVec4(),
      inactiveColor: uniformVec4(),
      activeColor: uniformVec4(),
      selectedColor: uniformVec4(),
    },
  )
