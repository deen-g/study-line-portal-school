export default {
  public :{
    school :{
      get :'/public/school',
      access :'/public/school/access',
      register :'/public/school/register'
    }
  },
  authentication :{
    school :{
      login :'/authentication/school/login',
    }
  },
  authorized :{
    logout :'/authorized/user/logout',
    webpages :'/web-pages',
    user_authenticate :'/authorized/user/authenticate',
    user_activation :'/authorized/user/activation',
    user_generate_verification :'/authorized/user/generate/verification',
    school :{
      count :'/authorized/schools/count',
      find :'/authorized/schools'
    }
  }
}
