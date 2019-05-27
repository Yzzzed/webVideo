import './article-update.css'
import _cmds from '../../util/cmds'
import _articles from '../../service/articles-service'
import E from 'wangeditor'

const page = {
    init: function(){
        this.onload()
        this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
        //更新文章
        $('.save').on('click', () => {
            // console.log("TCL: $('#title').val()", $('#title').val())
            // console.log("TCL: _this.editor.txt.html()", _this.editor.txt.html())
            const articleInfo = {
                id: _cmds.getUrlParam('id'),
                title: $.trim($('#title').val()),
                content: $.trim(_this.editor.txt.html())
            }

        _this.update(articleInfo)
        })

        $('.return').on('click', () => {
            window.location.href = './user-article.html'
        })


    },
    onload:function(){
        this.loadEditor()
        this.loadArticleDetail()
    },
    loadEditor: function(){
        let e = new E('#editor')
        e.create()
        this.editor = e
    },
    loadArticleDetail: function(){
        const _this = this
        const id = _cmds.getUrlParam('id')
        let title = $('#title'),
            content = _this.editor
        _articles.getMyArticleDetail({
            id: id
        }, res => {
            title.val(res.title)
            content.txt.html(res.content)
        }, errMsg => {
            content.txt.html('<p class="err-tips">加载失败~</p>')
        })
    },
    update: function(articleInfo){
        if(!_cmds.validate(articleInfo.title, 'required')){
            _cmds.errorTips('标题不能为空~')
            return
        }
        if(!_cmds.validate(articleInfo.content, 'required')){
            _cmds.errorTips('内容不能为空~')
            return
        }
        
        if(window.confirm('确定要更新该文章吗')){
            _articles.updateArticle(articleInfo, res => {
                _cmds.successTips('更新成功~')
                window.location.href = './user-article.html'
            }, errMsg => {
                _cmds.errorTips(errMsg)
            })
        }
    }
}

$(function(){
    page.init()
})