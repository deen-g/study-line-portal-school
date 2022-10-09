const can = {
  create :{
    school :{
      role :'can::create::school::role',
      bank :{
        account :'can::create::school::bank::account'
      },
      application :'can::create::school::application',
      email :{
        template :'can::create::school::email::template'
      }
    }
  },
  edit :{
    school :{
      default :'can::edit::school',
      plans :'can::edit::school::plans',
      page :'can::edit::school::page',
      application :'can::edit::school::application',
      bank :{
        account :'can::edit::school::bank::account'
      },
      email :{
        template :'can::edit::school::email::template'
      }
    }
  },
  view :{
    school :{
      default :'can::view::school',
      application :'can::create::school::application'
    }
  },
  assign :{
    school :{
      role :'can::assign::school::role',
      application :'can::assign::school::application'
    }
  }
}
export { can }
