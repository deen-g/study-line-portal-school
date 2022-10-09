export default {
  public :{
    school :{
      get :'/public/school',
      access :'/public/school/access',
      register :'/public/school/register',
      login :'/public/school/login',
      account :{
        access :'/public/school/account/access'
      }
    }
  },
  account :{
    school :{
      access :'/authentication/school/login'
    }
  },
  authorized :{
    logout :'/authorized/user/logout',

    webpages:{
      structure :{
        get:'/authorized/school/web-pages/structure/find',
        update:'/authorized/school/web-pages/structure/update'
      },
      documents:{
        uploads: process.env.uri + '/api/v1/authorized/uploads/school/web-contents'
      },
      page: {
        create:'/authorized/school/web-pages/page/add',
        edit :'/authorized/school/web-pages/page/edit',
      },
    },
    documents:{
      webcontents:'/authorized/school/documents/web-contents',
    },
    school :{
      count :'/authorized/schools/count',
      find :'/authorized/schools'
    }
  }
}
