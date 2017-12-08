<template>
  <Row v-if="doneInit" class="layout" type="flex">
    <Col span="4" class="layout-menu-left">
      <div class="layout-user">
        <Avatar :src="supplier.thumbnailUrl" size="large" />
        <div class="layout-user__info">
          <div class="layout-user__name">{{user.realName}}</div>
          <div class="layout-user__role">{{user.userName}}</div>
        </div>
      </div>

      <Menu @on-select="onMenuSelect" ref="menu" :active-name="activeName" theme="dark" width="auto" :open-names="openNames">  
        <Submenu v-for="m in menus" :key="m.supplierMenuId" :name="m.menuName">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            {{m.menuName}}
          </template>
          <MenuItem v-for="sm in m.children" :key="sm.supplierMenuId" :name="sm.menuName">
            {{sm.menuName}}
          </MenuItem>
        </Submenu>
      </Menu>
    </Col>
    <Col ref="body" class="right-panel" span="20">
      <div class="layout-header">
        <router-link :to="{ path: '/index/index-message'}" class="layout-header__logo">
            烟宝订货-店铺端
        </router-link>
        <div @click="userset" class="layout-header__btn">
          <Icon type="gear-a"></Icon>
          用户设置
        </div>
        <div @click="logout" class="layout-header__btn">
          <Icon type="log-out"></Icon>
          退出登录
        </div>
      </div>
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem v-for="b in breadcrumb" :key="b.url" :href="b.url ? b.url : ''">
            {{b.name}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="layout-content">
        <keep-alive>
          <router-view  class="layout-content-main" v-if="$route.meta.keepAlive">
          </router-view>
        </keep-alive>
        <router-view class="layout-content-main" v-if="!$route.meta.keepAlive">
        </router-view>
      </div>
    </Col>
    <div class="tool">
      <div v-if="toTopOpacity > 0.1" @click="toTop" class="to-top" :style="{ opacity: toTopOpacity }">
        <Icon class="tool__icon" type="arrow-up-b"></Icon>
      </div>
      <div v-if="!$route.meta.topLevel" @click="goback" class="goback">
        <Icon class="tool__icon" type="arrow-left-b"></Icon>
      </div>
    </div>
  </Row>
  <div v-else></div>
</template>
<script>
    export default {
        
    }
</script>
<style lang="less" scoped>
@tabbar-height: 60px;
@breadcrumb-height: 30px;
@content-margin: 15px;

.layout {
  background: #f5f7f9;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.layout-breadcrumb {
  height: @breadcrumb-height;
  padding: 10px 15px 0;
}

.layout-content {
  min-height: calc(~"100% - @{tabbar-height} - @{breadcrumb-height} - @{content-margin}");
  margin: @content-margin;
  margin-bottom: 0px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
}

.layout-menu-left {
  background: #464c5b;
  overflow-y: scroll;
  overflow-x: hidden;
}

.layout-header {
  text-align: right;
  height: @tabbar-height;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);

  &__btn {
    font-size: 13px;
    display: inline-block;
    padding: 20px 10px;
    height: 100%;
    cursor: pointer;
  }

  &__logo {
    float: left;
    font-size: 15px;
    font-style: italic;
    margin-left: 15px;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    cursor: pointer;
    color: gray;
  }

  &__btn:hover {
    background-color: #efefef;
  }
}

.layout-user {
  height: 50px;
  margin: 15px 24px;
  display: flex;
  align-items: center;
  color: white;

  &__info {
    margin-left: 10px;
  }

  &__name {
    font-size: 15px;
  }

  &__role {
    font-size: 12px;
    color: #aaa;
  }
}

.right-panel {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
}

.tool {
  position: fixed;
  right: 40px;
  bottom: 60px;
  z-index: 999;

  &__icon {
    color: #fff;
    display: block;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
  }
}

.goback, .to-top {
  opacity: .6;
  color: white;
  background-color: #58b7ff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
}

.goback {
  background-color: #5f5f5f;
}

.to-top {
  transition: .3s;
  margin-bottom: 10px;

  &:hover {
    opacity: 1
  }
}

/*默认滚动条样式*/
::-webkit-scrollbar {
    width: 2px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: #eee;
}
::-webkit-scrollbar-thumb {
    border: 1px #808080 solid;
    border-radius: 10px;
    background: #999;
}
::-webkit-scrollbar-thumb:hover {
    background: #7d7d7d;
}
</style>
