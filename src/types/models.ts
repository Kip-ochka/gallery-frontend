export interface IPhoto {
  image: string
  imageId: string
  sections: []
  tags: []
}

export interface IPhotoFile {
  lastModified: number
  name: string
  size: string
  type: string
  webkitRelativePath: string
}

export interface PhotoCardProps {
  imageId: string
  image: string
}

export interface ITag {
  tag: string
  tagId: number
}

export interface ITagsState {
  tags: Array<ITag>
  addedTags: Array<ITag>
  loading: boolean
  error: string | null
}

export interface IPostTag {
  token: string | null
  name: string
}
export interface IsetAboutMe {
  textValue: string
  token: string
}

export interface IFileUrl {
  url?: string
}

export interface IDragFileProps {
  setFile: (arg: IPhotoFile[]) => void
  setFileUrl: ({}) => void
}

export interface IPreviewImageProps {
  url: string | undefined
  getFileName: () => string
  setFile: (arg: IPhotoFile[] | null) => void
}

export interface INavBarProps {
  isOpen?: boolean
  onClose?: () => void
}

export interface IAdminStateInterface {
  token: string | null
  aboutMe: string | null
  isLogged: boolean
  error: null | string
  authError: null | string
  loading: boolean
  aboutLoading: boolean
  aboutError: null | string
}

export interface IsetAboutMe {
  textValue: string
  token: string
}

export type Section = {
  sectionId: number
  section: string
  tags: Array<ITag>
}

export type SectionsSliceState = {
  sections: Array<Section>
  isLoading: boolean
  error: null | string
}

export type ActionPayload = {
  section: Section
  tag: ITag
}
