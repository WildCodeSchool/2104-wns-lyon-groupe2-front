import { Box, Tab, Tabs, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import {
  TabPanelProps,
  IAssetsProps,
  ITabsProps,
} from '../../Interfaces/Assets'
import FileUpload from '../FileUPload/FileUpload'
import AddFolder from './AddFolder'

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}
const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export const TabsContainer: React.FC<ITabsProps> = ({
  folderId,
  updateComponent,
  setUpdateComponent,
  refetch,
  parentId,
  handleClick,
  setFolderName,
  folderName,
  sameNameError,
  submitNewFolder,
}) => {
  const [value, setValue] = useState<number>(0)
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue)
  }
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Add file or create folder"
      >
        <Tab label="Uploader un fichier" {...a11yProps(0)} />
        <Tab label="Créer un dossier" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FileUpload
          folderId={folderId}
          updateComponent={updateComponent}
          setUpdateComponent={setUpdateComponent}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddFolder
          handleClick={handleClick}
          submitNewFolder={submitNewFolder}
          sameNameError={sameNameError}
          folderName={folderName}
          setFolderName={setFolderName}
        />
      </TabPanel>
    </>
  )
}
