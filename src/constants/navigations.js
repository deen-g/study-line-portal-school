import { useAuthStore } from "stores/auth"
import { can } from "src/constants/abilities"

let routeList = [
  {
    hr :true
  },
  {
    title :'Application Manager',
    icon :'school',
    authorized :['web', 'auth', 'user::is::student'],
    list :[
      {
        title :'Apply',
        caption :'create applications for schools',
        icon :'school',
        link :'new-application',
        authorized :[]
      },
      {
        title :'Applications',
        caption :'all school application',
        icon :'school',
        link :'user-application',
        authorized :[]
      }
    ]
  },
  {
    title :'Configuration',
    icon :'school',
    authorized :['web', 'auth'],
    list :[
      {
        title :'School detail',
        caption :'create applications for schools',
        icon :'school',
        link :'school-profile',
        authorized :[]
      },
      {
        title :'New school',
        caption :'create applications for schools',
        icon :'school',
        link :'new-school',
        authorized :['user::create::school']
      }
    ]
  },
  {
    title :'Management',
    icon :'school',
    authorized :['web', 'auth'],
    list :[
      {
        title :'Page Management',
        caption :'manage web pages',
        icon :'school',
        link :'web-pages-page',
        authorized :[can.edit.school.page]
      },
      {
        title :'next ',
        icon :'school',
        authorized :[can.assign.school.application],
        list :[
          {
            title :'todo',
            caption :'create applications for schools',
            icon :'school',
            link :'school-profile',
            authorized :[]
          }
        ]
      }
    ]
  }

]
const auth = useAuthStore()
const processLink = (item) => {
  let data = {...item}
  let check = true
  if(item.authorized){
    item.authorized.forEach((i) => {
      if(check){
        const user = auth.getAccount
        switch (i) {
          case 'web':
            console.log('is web')
            break
          case 'auth':
            check = auth.isLoggedIn
            break
          case 'user::is::student':
            check = !user.is_super_admin

            break
          default:
            if(auth.getRoleAbilities){
              let abilities = auth.getRoleAbilities
              check = abilities.filter(f => f === i)
              check = check.length > 0
            } else {
              check = false
            }
            break
        }
      }
    })
  }
  delete data.authorized
  return check ? data : check
}
const configureLinks = (links, authorized = null) => {
  let list = []
  links.forEach(function (item, index, arr){
    if(authorized){
      item.authorized = authorized.concat(item.authorized)
    }
    let obj = processLink(item)
    if(obj){
      if(obj.list){
        obj.list = configureLinks(item.list, item.authorized)
      }
      list.push(obj)
    }
  })
  return list
}
const links = async (link) => {

  let route = link.concat(routeList)
  console.log(route)
  let listings = configureLinks(route)
  return listings
}
export default {links}
