
import './nav-side.css'
import _cmds from '../../../util/cmds'
import templateIndex from './nav-side.string'

//侧边导航
const navSide = {
    option: {
        name: '',
        navList: [
            {name: 'my-center',desc: '个人中心',href: `./user-center.html`},
            {name: 'my-article',desc: '我的文章',href: `./user-article.html`},
            {name: 'my-collection',desc: '我的收藏',href: `./user-collection.html`},
            {name: 'my-follows',desc: '我的关注',href: `./user-follows.html`},
            {name: 'my-fans',desc: '我的粉丝',href: `./user-fans.html`}
        ]
    },
    init: function(option){
            $.extend(this.option,option)
            this.renderNav()
    },
    //渲染导航菜单
    renderNav: function(){
        //计算active数据
        for(let item of this.option.navList){
            if(item.name === this.option.name){
                item.isActive = true
            }
        }
        //渲染数据
        let navHtml = _cmds.renderHtml(templateIndex, {
            navList: this.option.navList
        })
        //把html放入容器
        $('.nav-side').html(navHtml)
    }
}

export default navSide