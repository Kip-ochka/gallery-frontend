import iconBehance from '../../img/social-icon/behance.svg'
import iconFacebook from '../../img/social-icon/facebook.svg'
import iconInsta from '../../img/social-icon/instagram.svg'
import iconLinked from '../../img/social-icon/linkedin.svg'
import iconTelegram from '../../img/social-icon/telegram.svg'
import iconVK from '../../img/social-icon/vk.svg'
import iconTwitter from '../../img/social-icon/twitter.svg'
import iconPinterest from '../../img/social-icon/pinterest.svg'

export const icons = [
  { icon: iconBehance, link: 'behance' },
  { icon: iconFacebook, link: 'fs' },
  { icon: iconInsta, link: 'inst' },
  { icon: iconLinked, link: 'linkedin' },
  { icon: iconTelegram, link: 'tg' },
  { icon: iconVK, link: 'vk' },
  { icon: iconTwitter, link: 'tw' },
  { icon: iconPinterest, link: 'pin' },
]

export const iconInputsData = [
  { title: 'Behance link:', inputName: 'behance' },
  { title: 'Facebook link:', inputName: 'fs' },
  { title: 'Instagram link:', inputName: 'inst' },
  { title: 'LinkedIn link:', inputName: 'linkedin' },
  { title: 'Telegram link:', inputName: 'tg' },
  { title: 'VKontacte link:', inputName: 'vk' },
  { title: 'Twitter link', inputName: 'tw' },
  { title: 'Pinteres link', inputName: 'pin' },
]

export const defaultValues = {
  name: '',
  about: '',
  clients: '',
  email: '',
  tel: '',
  fs: '',
  inst: '',
  linkedin: '',
  behance: '',
  vk: '',
  tg: '',
  pin: '',
  tw: '',
}
