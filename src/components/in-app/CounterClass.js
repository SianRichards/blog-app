// class Counter extends React.Component {
//     state = { dataValue: null }

//     componentDidMount() {
//         // when component first renders, set displayed
//         // counter to 0
//         this.props.reset()
//         // if the current user is not null, retrieve 
//         // their score value from the database
//         if (this.props.user) {
//             let authUid = this.props.user.uid
//             databaseRef('score/' + authUid).on('value', ((snapshot) => {
//                 setDataValue(snapshot.val())
//             }))
//         }
//     }

//     saveUserCounterScore = (event) => {
//         // on clicking save, post the user's score
//         // to the database path of user/user's id
//         let authUid = this.props.user.uid
//         setDatabaseValue('score/' + authUid, this.props.score)
//     };

//     render() {
//         return (
//             <div className="ui segment">
//                 <button className="button" onClick={this.props.increment}>+</button>
//                 <div>{this.props.score}</div>
//                 <button className="button" onClick={this.props.decrement}>-</button>
//                 <button className="ui primary button" onClick={this.saveUserCounterScore}>
//                     Save Score
//                 </button>
//                 <div>
//                     Your saved value is {this.state.dataValue}
//                 </div>
//             </div>
//         )
//     }
// };

// const mapStateToProps = (state) => {
//     return {
//         score: state.score,
//         user: state.user
//     }
// };

// export default connect(mapStateToProps, { increment, decrement, reset })(Counter);