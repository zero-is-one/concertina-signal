import styled from "@emotion/styled"
import Help from "mdi-react/HelpCircleIcon"
import Settings from "mdi-react/SettingsIcon"
import { observer } from "mobx-react-lite"
import { CSSProperties, FC, useCallback } from "react"
import { getPlatform, isRunningInElectron } from "../../helpers/platform"
import { useStores } from "../../hooks/useStores"
import ArrangeIcon from "../../images/icons/arrange.svg"
import PianoIcon from "../../images/icons/piano.svg"
import TempoIcon from "../../images/icons/tempo.svg"
import { envString } from "../../localize/envString"
import { Localized } from "../../localize/useLocalization"
import { Tooltip } from "../ui/Tooltip"
import { EditMenuButton } from "./EditMenuButton"
import { FileMenuButton } from "./FileMenuButton"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.darkBackgroundColor};
  height: 3rem;
  flex-shrink: 0;
  -webkit-app-region: drag;
  padding: ${() => {
    if (isRunningInElectron()) {
      const platform = getPlatform()
      switch (platform) {
        case "Windows":
          return "0 0 0 0"
        case "macOS":
          return "0 0 0 76px"
      }
    }
  }};
`

export const Tab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-top: solid 0.1rem transparent;
  color: ${({ theme }) => theme.secondaryTextColor};
  cursor: pointer;
  -webkit-app-region: none;

  &.active {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.backgroundColor};
    border-top-color: ${({ theme }) => theme.themeColor};
  }

  &:hover {
    background: ${({ theme }) => theme.highlightColor};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}
`

export const TabTitle = styled.span`
  margin-left: 0.5rem;

  @media (max-width: 850px) {
    display: none;
  }
`

const FlexibleSpacer = styled.div`
  flex-grow: 1;
`

export const IconStyle: CSSProperties = {
  width: "1.3rem",
  height: "1.3rem",
  fill: "currentColor",
}

export const Navigation: FC = observer(() => {
  const { rootViewStore, router } = useStores()

  const onClickPianoRollTab = useCallback(() => {
    router.path = "/track"
  }, [router])

  const onClickArrangeTab = useCallback(() => {
    router.path = "/arrange"
  }, [router])

  const onClickTempoTab = useCallback(() => {
    router.path = "/tempo"
  }, [router])

  const onClickSettings = useCallback(() => {
    rootViewStore.openSettingDialog = true
  }, [rootViewStore])

  const onClickHelp = useCallback(() => {
    rootViewStore.openHelp = true
  }, [rootViewStore])

  return (
    <Container>
      {!isRunningInElectron() && <FileMenuButton />}
      {!isRunningInElectron() && <EditMenuButton />}

      <Tooltip
        title={
          <>
            <Localized name="switch-tab" /> [{envString.cmdOrCtrl}+1]
          </>
        }
        delayDuration={500}
      >
        <Tab
          className={router.path === "/track" ? "active" : undefined}
          onMouseDown={onClickPianoRollTab}
        >
          <PianoIcon style={IconStyle} viewBox="0 0 128 128" />
          <TabTitle>
            <Localized name="piano-roll" />
          </TabTitle>
        </Tab>
      </Tooltip>

      <Tooltip
        title={
          <>
            <Localized name="switch-tab" /> [{envString.cmdOrCtrl}+2]
          </>
        }
        delayDuration={500}
      >
        <Tab
          className={router.path === "/arrange" ? "active" : undefined}
          onMouseDown={onClickArrangeTab}
        >
          <ArrangeIcon style={IconStyle} viewBox="0 0 128 128" />
          <TabTitle>
            <Localized name="arrange" />
          </TabTitle>
        </Tab>
      </Tooltip>

      <Tooltip
        title={
          <>
            <Localized name="switch-tab" /> [{envString.cmdOrCtrl}+3]
          </>
        }
        delayDuration={500}
      >
        <Tab
          className={router.path === "/tempo" ? "active" : undefined}
          onMouseDown={onClickTempoTab}
        >
          <TempoIcon style={IconStyle} viewBox="0 0 128 128" />
          <TabTitle>
            <Localized name="tempo" />
          </TabTitle>
        </Tab>
      </Tooltip>

      <FlexibleSpacer />

      {!isRunningInElectron() && (
        <>
          <Tab onClick={onClickSettings}>
            <Settings style={IconStyle} />
            <TabTitle>
              <Localized name="settings" />
            </TabTitle>
          </Tab>

          <Tab onClick={onClickHelp}>
            <Help style={IconStyle} />
            <TabTitle>
              <Localized name="help" />
            </TabTitle>
          </Tab>
        </>
      )}
    </Container>
  )
})
