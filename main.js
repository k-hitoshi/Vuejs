// step02_ローカルストレージ API の使用
let STORAGE_KEY = 'todos-vuejs-demo'
let todoStorage = {
    fetch: function () {
        let todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function (todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

// step01_インスタンスの作成
const app = new Vue({
    el: '#app',

    data: {
        // step05_リストレンダリング
        todos: [],
        current: -1,
        options: [
            { value: -1, label: 'すべて' },
            { value: 0, label: '作業中' },
            { value: 1, label: '完了' }
        ]
    },

    // step12_リストの絞り込み機能
    computed: {

        computedTodos: function() {
            return this.todos.filter(function(el) {
                return this.current < 0 ? true : this.current === el.state
            }, this)
        },

        labels() {
            return this.options.reduce(function (a, b) {
                return Object.assign(a, { [b.value]: b.label })
            },{})
            // キーから見つけやすいように、次のように加工したデータを作成
            // {0: '作業中', 1: '完了', -1: 'すべて'}
        }
    },

    // step08_ストレージへの保存の自動化
    watch: {
        // オプションを使う場合はオブジェクト形式にする
        todos: {
            // 引数はウォッチしているプロパティの変更後の値
            handler: function (todos) {
                todoStorage.save(todos)
            },
            // deep オプションでネストしているデータも監視できる
            deep: true
        }
    },

    // step09_保存されたリストを取得しよう
    created() {
        // インスタンス作成時に自動的に fetch() する
        this.todos = todoStorage.fetch()
    },

    // step07_リストへの追加
    // step10_状態の変更と削除の処理
    methods: {
        doAdd: function (event, value) {
            let comment = this.$refs.comment
            if (!comment.value.length) {
                return
            }
            // { 新しいID, コメント, 作業状態 }
            // というオブジェクトを現在の todos リストへ push
            // 作業状態「state」はデフォルト「作業中=0」で作成
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            // フォーム要素を空にする
            comment.value = ''
        },

        doChangeState: function (item) {
            item.state = item.state ? 0 : 1
        },

        // 削除の処理
        doRemove: function (item) {
            let index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }

    }

})

