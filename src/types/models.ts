export interface IPhoto {
  image: string
  imageId: string
  sections: []
  tags: []
}

export interface IImage {
  key: string
  image: string
  imageId: string
}

export interface IPhotoFile {
  lastModified: number
  name: string
  size: string
  type: string
  webkitRelativePath: string
}

export interface ITag {
  tag: string
  tagId: number
}

export interface ITagWithType extends ITag {
  type: string
}

export interface ITagProps extends ITag {
  onClick: (arg: ITag) => void
  type: string
}

export interface ITagsState {
  tags: Array<ITag>
  tagsToAdd: Array<ITag>
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
  setFile: any
  setFileUrl: ({}) => void
}

export interface IPreviewImageProps {
  url: string | undefined
  getFileName: () => string
  setFile: any
  onSubmit: () => void
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

export interface IImages {
  images: []
  loading: boolean
  getImagesError: null | string
  file: File | undefined
  fileUrl: string
}

export interface IToAttacth {
  path: string
  itemId: number
  tagId: number
  token: string
}

export interface IToAttacth {
  path: string
  toSend: File
  addedTags: ITag[]
  token: string
}
