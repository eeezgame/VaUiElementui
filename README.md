## VaUiElementui

### components

- [x] Layout
- [ ] LoginPage
- [ ] List

#### Layout Component Usage

```vue
const BasicLayout = {
    template: `
      <layout
        :menus="menus"
        :show-settings="true"
        :need-tags-view="false"
        :fixed-header="true"
        :sidebar="sidebar"
        device="desktop"
        :handleCollapse="handleCollapse"
        :toggleSideBar="toggleSideBar"
        mode="mixLayout"
      >
        <template slot="rightMenuRender">
            <div style="display: flex;align-items: center;height: 100%;">
                <a href="https://github.com/eeezgame" target="_blank" rel="noopener noreferrer" style="height:40px;">
                    <img src="https://octodex.github.com/images/pusheencat.png" width="40" height="40"></img>   
                </a>
            </div>
        </template>
        <app-main>
            <router-view></router-view>
        </app-main>
      </layout>
    `,
    data(){
      return {
        menus,
        sidebar:{
            opened:true,
            withoutAnimation: false
        }
      }
    },
    methods:{
        handleCollapse(){
            this.sidebar.opened = false
        },
        toggleSideBar(){
            this.sidebar.opened = !this.sidebar.opened
        }
    }
}
```

#### API

| Property       | Description | Type                                                       | Default Value                                          |
| -------------- | ----------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| menus          |             | Array                                                      | []                                                     |
| sidebar        |             | Object                                                     | {   opened: true,   withoutAnimation: false, };        |
| device         |             | 'desktop'\|'mobile'                                        | 'desktop'                                              |
| mode           |             | 'sideMenuLayout' \|'topMenu '\|'mixLayout'\| 'leftLayout'' | 'sideMenuLayout'                                       |
| logo           |             | String                                                     | "https://avatars.githubusercontent.com/u/63237008?v=4" |
| title          |             | String                                                     | "Layout"                                               |
| showSettings   |             | Boolean                                                    | false                                                  |
| needTagsView   |             | Boolean                                                    | false                                                  |
| fixedHeader    |             | Boolean                                                    | false                                                  |
| handleCollapse |             | Function                                                   | ()=>{}                                                 |
| toggleSideBar  |             | Function                                                   | ()=>{}                                                 |
| dashboardPath  |             | String                                                     | ''/dashboard'                                          |



## Build project

```
npm run build:pro # Build library
or
yarn build:pro 
```