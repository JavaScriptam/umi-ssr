export default  [
  {
    path:'/',
    
    routes:[
      {
        path: '/backend',
        component: '@/layout/backend.tsx',
        wrappers:[
          '@/wrappers/auth.tsx'
        ],
        routes:[
          {
            
            path:"/backend/role",
            component: '@/views/role/index.tsx'
          },
          {
            path:"/backend/manage",
            component: '@/views/manage/index.tsx'
          }
        ]
      },
      {
          path:"login",
          component: '@/views/login/index.tsx'
      }
    ]
  },
  
]