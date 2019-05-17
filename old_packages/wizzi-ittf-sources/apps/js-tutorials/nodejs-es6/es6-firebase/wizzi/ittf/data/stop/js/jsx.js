(function () {

    var HelloWorld = React.createClass({

        render: function () {
            return (
                <div className="greeting" data={x} {...other}>
                    Hello World
                </div>
            );
        }
    });

    var element = React.createElement(HelloWorld, {});

    ReactDOM.render(element, document.getElementById("app"));

})();

const TodoList = ({ todos }) => (
    <div>
        {...todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </div>
)

