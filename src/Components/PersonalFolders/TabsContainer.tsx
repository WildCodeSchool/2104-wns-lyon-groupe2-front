import { Box, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { TabPanelProps, ITabsProps } from '../../Interfaces/Assets'
import AssetsUpload from '../FileUPload/AssetsUpload'
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
  updateComponent,
  setUpdateComponent,
  parentId,
  handleClick,
  setFolderName,
  folderName,
  sameNameError,
  submitNewFolder,
  isModalOpen,
  setIsModalOpen,
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
        <AssetsUpload
          folderId={parentId}
          updateComponent={updateComponent}
          setUpdateComponent={setUpdateComponent}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddFolder
          handleClick={handleClick}
          submitNewFolder={submitNewFolder}
          sameNameError={sameNameError}
          folderName={folderName}
          setFolderName={setFolderName}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </TabPanel>
    </>
  )
}
