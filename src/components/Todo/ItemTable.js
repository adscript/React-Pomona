import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTodos } from '../../actions/todo'
import EditItem from './EditItem';
import Item from './Item';

class ItemTable extends Component {

    componentDidMount() {
        this.props.loadTodos();
    }

    render() {
        const nodes = this.props.todos.map((item, index) => {
            return (
                    item.isVisible ?
                    item.onEdit ?
                    <EditItem key={index} todos={item} index={index + 1} /> : 
                    <Item key={index} todos={item} index={index + 1} />
                    : ''
            )
        })

        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" style={{width: '10%'}}>Done</th>
                        <th scope="col" style={{width: '15%'}}>Title</th>
                        <th scope="col" style={{width: '25%'}}>Description</th>
                        <th scope="col" className="text-center" style={{width: '20%'}}>Priority</th>
                        <th scope="col" style={{width: '20%'}}>Action</th>
                    </tr>
                </thead>
                <tbody className="scrollable" style={{ maxHeight: '20vh', overflowY: 'auto' }}>
                    {nodes}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos
})

const mapDispatchToProps = (dispatch) => ({
    loadTodos: () => dispatch(loadTodos())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemTable)