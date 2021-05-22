import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/project/Dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/device', // 设备管理
    component: Layout,
    redirect: '/device/index',
    name: '设备管理',
    meta: {
      title: '设备管理',
      icon: 'example'
    },
    children: [
      {
        path: 'index', // 常用参数配置
        component: () => import('@/views/project/Device/device_use'),
        name: '设备管理',
        meta: {
          title: '设备管理',
          icon: 'excel'
        }
      }
      // {
      //   path: 'device_advanced', // 高级参数配置
      //   component: () => import('@/views/project/Device/device_advanced'),
      //   name: 'D_Advanced',
      //   meta: {
      //     title: 'D_Advanced',
      //     icon: 'peoples'
      //   }
      // },
      // {
      //   path: 'device_recovery', // 设备恢复
      //   component: () => import('@/views/project/Device/device_recovery'),
      //   name: 'D_Recovery',
      //   meta: {
      //     title: 'D_Recovery',
      //     icon: 'form'
      //   }
      // },
      // {
      //   path: 'device_upgrading', // 设备升级
      //   component: () => import('@/views/project/Device/device_upgrading'),
      //   name: 'D_Upgrading',
      //   meta: {
      //     title: 'D_Upgrading',
      //     icon: 'user'
      //   }
      // }
    ]
  },
  {
    path: '/authority', // 权限管理
    component: Layout,
    redirect: '/authority/index',
    name: '权限管理',
    children: [
      {
        path: 'index',
        component: () => import('@/views/project/Authority/index'),
        name: '权限管理',
        meta: {
          title: '权限管理',
          icon: 'excel'
        }
      }
    ]
  },
  {
    path: '/record', // 记录管理
    component: Layout,
    redirect: '/record/index',
    name: '记录管理',
    children: [{
      path: 'index',
      component: () => import('@/views/project/Record/index'),
      name: '记录管理',
      meta: {
        title: '记录管理',
        icon: 'example'
      }
    }, {
      path: 'opendoor',
      component: () => import('@/views/project/Record/opendoor'),
      name: '开门记录',
      hidden: true,
      meta: {
        title: '开门记录',
        icon: 'example'
      }
    }, {
      path: 'snap',
      component: () => import('@/views/project/Record/snap'),
      name: '抓拍记录',
      hidden: true,
      meta: {
        title: '抓拍记录',
        icon: 'example'
      }
    }, {
      path: 'devicelog',
      component: () => import('@/views/project/Record/devicelog'),
      name: '记录管理',
      hidden: true,
      meta: {
        title: '记录管理',
        icon: 'example'
      }
    }
    ]
  },
  {
    path: '/diagnostic', // 记录管理
    component: Layout,
    redirect: '/diagnostic/diagnostic',
    name: '诊断工具',
    children: [
      {
        path: 'diagnostic',
        component: () => import('@/views/project/Diagnostic/diagnostic'),
        name: '诊断工具',
        meta: {
          title: '诊断工具',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/project/Dashboard/person'), // 个人信息
        name: 'Person',
        meta: { title: 'Person', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/psdUpdate',
    component: Layout,
    redirect: '/psdUpdate/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/project/Dashboard/psdUpdate'), // 修改密码
        name: 'psdUpdate',
        meta: { title: 'psdUpdate', icon: 'user', noCache: true }
      }
    ]
  }
]
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
