/*
1.a 
    Các bạn mở tất cả các file đã code theo anh SƠN hướng dẫn rồi tham khảo đọc 
    theo cách của mình (Nếu mình có sai thì xin các bạn góp ý )
    Trình tự đọc của mình
        no.1> mở file reducer.js */
        const init = {
            cars : ['bmw']
        } //  const init là một biến chứa obj cars:['bmw']

        export default  function reducer(state=init,action,...args){
        // function reducer được XUẤT ra bên ngoài nó nhận ít nhất 3 tham số là 
        // 1 state ban đầu được gán thẳng giá trị = init = cars : ['bmw']
        // 2 action là tham số khi nào chúng ta truyền vào thì vòng lặp switch sẽ kiểm tra và thực hiện
        // 3 ...args là những tham số nhận theo kiểu Destructuring (bài này có ở JS cơ bản số 189 của anh Sơn)

            switch(action){   /* khi lần đầu chạy action chưa có giá trị nên nó chạy sẽ thằng default = sate = cars : ['bmw']   */ 
                
                case 'ADD': /* đoạn case này chưa quan tâm */
                    const[newCar]=args
                    return {...state,cars:[...state.cars,newCar]}

                default: return state
            }
        }
    //  no.2> mở file core.js 
        export default function html([first,...strings],...values){
            return values.reduce((acc,cur)=> acc.concat(cur,strings.shift()),[first]).filter(x => x && x !== true || x ===0 ).join(''); 
        }
        // function html XUẤT ra bên ngoài nhận tham số kiểu Tagged template literals bài 192 JS cơ bản 
        // hàm này trả về gì? 
        values.reduce((acc,cur)=> acc.concat(cur,strings.shift()),[first]).filter(x => x && x !== true || x ===0 ).join(''); 
        // bước 1 nó trả về một mảng [a,b,c,d,v.v] tùy vào ta truyền vào cái gì
        // bước 2 .filter (filter dùng để kiểm tra các phần tử trong mảng)
        //   x => x && x !== true || x ===0  đọc ra là (nếu phần tử này là kiểu Truthy và nó không phải là True) hoặc (phần tử đó = 0) 
        // thì thõa mãn điều kiện. 
        // bước 3 đã có một mảng mới sau khi kiểm tra thì join('') lại => đã có một chuỗi HTML

    //  tiếp đến là hàm createStore


        export function createStore(reducer){  /* reducer lúc này là function reducer có ở no.1  */
            let state = reducer()  /* state chạy reducer() sẽ nhận được {cars:['bmw']} */
            const roots = new Map() /* roots này khởi tạo bằng thằng new Map nó đặt key và value gì củng được  khác với obj bình thường*/
           
           // hàm render đoạn này các bạn khoan đọc, đọc thằng CONNECT phía dưới trước 
            function render(){                    // sau khi đi 1 vòng thì tới thằng render :D              
                for(const[root,component] of roots){    //render làm gì  nó lặp qua cái thằng roots ta mới set giá trị vào [root,component] tương đương với 
                                                        // [document.getElementById('root'):App] (document là key App là component)
                    const output = component()          // output chạy component() tương đương với thằng App() lúc này App mới thực sự được call => trả về chuỗi html
                    root.innerHTML = output             // root.innerHTML tương đương với document.getElementById('root').innerHTML => in ra màn hình
                                                        // xong tiếp đây là vòng 1 giờ đến vòng 2 các bạn kéo xuống phía dưới cùng nhé
                }
            }
            return {
                        //function  attach  được xuất ra khi chúng ta chạy hàm createStore(reducer)
                        // lúc này các bạn mở file store.js lên các bạn sẽ thấy file này đã nhận 3 thằng
                        // const {attach,connect,dispatch} = createStore(reducer) 
                        // thế còn export {attach,connect} window.dispatch=dispatch làm gì?
                        //  file này chỉ là cái kho xuất ra 3 thằng này thôi 
                        // kế tiếp chúng ta mở file App.js lên
                        // ta thấy  const connector = connect() cái này để làm gì? => nó lưu lại cái mà thằng connect phía dưới return
                        // kéo xuống thằng connect luôn tạm bỏ qua thằng attach


                attach(component,root){         // attach nhận component,root tương đương với attach(App,document.getElementById('root'))
                roots.set(root,component)       // roots là biến roots phía trên nó set bằng thằng Map lúc đó roots = {document.getElementById('root'):App}
                    render()                    //cái này gọi render thì kéo lên render
                },




                connect(selector = state1 => state1){     // selector = state1 => state1 mình đặt thêm số 1 để khỏi nhầm với thằng let state = reducer() bên trên
                                                        // tức là nó là 1 hàm nhận vào gì thì trả ra cái đó function selector(state1){return state1} 
                                                        // nó có công dụng làm gì thì phía dưới nè
                    
                    return  (component) => (props,...args)=>
                    (component)(Object.assign({},props,selector(state),...args))   
                   
                    // cái đoạn return này mình hiểu nó là thế này
                    // khi thằng connect được call () các bạn nhớ thằng connector = connect()  không? tức là lúc này
                    //  connector = (component) => (props,...args) => (component)(Object.assign({},props,selector(state),...args)) 
                    // rồi ta mở lại file App.js ta thấy export default connector(App)
                    //  connector(App)    App được truyền qua đối số thì App sẽ bằng
                    //  App => (props,...args) => App(Object.assign({},props,selector(state),...args))
                
                    //  đoạn đó giống thế này
                    // return function(component){
                    //     return function(props,...args){
                    //        return component(Object.assign({},props,selector(state),...args))
                    //     }
                    // } 
                    //  thê lúc này connector(App) khi run thì nó chạy thế này function(App){
                    //     return function(props,...args){
                    //        return App(Object.assign({},props,selector(state),...args))
                    //     }
                    // } 
                    // cái này nó tương tự như Closure trong bài 8 khóa js nâng cao các bạn đọc kỹ lại sẽ hiểu
                  
                    // kế tiếp để ý dòng này (Object.assign({},props,selector(state),...args))
                    //  thằng App bên file App.js nó là function App({cars}) {cars} ở đây là gì 
                    // (Object.assign({},props,selector(state),...args)) nó thực chất là ({cars: ['bmw']}) vì khi thằng selector(state) chạy
                    // thì thằng Object.assign({}) nhận vào phần tử đầu tiên là  {cars: ['bmw']} thế còn props,...args 
                    // 2 thằng đó anh Sơn có nói sau này khi chúng ta cần thì truyền vào lúc này chưa cần
                    //  App({cars}) tương đương với App(['bmw']) tại sao các bạn đọc lại bài Default parameter values và Destructuring 187 189 khóa cơ bản
                    // thế giờ đã có thằng App({cars}) là có chuỗi để xuất ra rồi nên bạn mở file javars.js lên
                    // attach(App,document.getElementById('root')) bạn nhìn kỹ App lúc này chưa được call nhé
                    // khi nào call nó mới render ra view cái đó thì để thằng core.js chạy
                    // rồi giờ nhìn kỹ lại file của ta attach(App,document.getElementById('root')) được nhận từ file store và App 
                    // giờ kéo lên lại thằng attach
                },
                dispatch(action,...args){
                    state = reducer(state,action,...args)
                    render()
                }
            }
        }
// các bạn đã chạy được Attach và Connect thế giờ thằng dispatch nè
//  thằng dispatch này nhận (action,...args) các bạn mở lại file App.js
// <button onClick=dispatch('ADD','Mers')>AddCar</button> thấy thằng dispatch('ADD','Mers') chưa
// chúng ta đã khai báo window.dispatch=dispatch ở file store.js nên khi click vào nó sẽ run thằng này
// lúc này dispatch đã được truyền đối số là ADD và chiếc MersS600 MayBack của anh Sơn :))
// trong hàm dispatch lại có thằng state = reducer(state,action,...args) thằng state theo suy nghĩ của mình là nó được ghi đè
// nó chạy lại hàm reducer(state,action,...args) tức là reducer(cars:'Bmw',ADD,'Mers') => mở qua file reducer.js nè
// lúc này case đã có ADD mà thằng ADD này trả về thế này 
// const[newCar]=args tương đương với newCar = 'Mers'
// return {...state,cars:[...state.cars,newCar]} tương đương với 
// {
//     cars:'bmw',
//     cars:'bmw','Mers'
// }
// mà thằng object trùng key thì nó chỉ lấy key sau nên giờ ta chỉ còn {cars: ['bmw','Mers]}
//  khi thằng reducer được update lại thì thằng core.js , attach connect,.. được update lại nên lại render ra được view mới
// CÓ NHỮNG CÁI KHÔNG BIẾT MÌNH CHƯA HIỂU RÕ HAY KHÔNG NHƯNG THEO MÌNH NGHĨ
// Ở FILE reducer THẰNG args phải đặt trong [] = [args] để có thể nhận được tất cả các giá trị
// Ở FILE core bạn thử tạo ra một xyz nào đay biến rồi bạn gán vào cho thằng const output = component(xyz)
// không biết đó có phải là thứ anh Sơn muốn sau này dạy thêm hay không đó là cái đối số của thằng (props,...args) hàm connect
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Bài này thì theo mình cần phải đọc lại các bài ES6 khóa cơ bản bà tất cả các bài khóa nâng cao :D
