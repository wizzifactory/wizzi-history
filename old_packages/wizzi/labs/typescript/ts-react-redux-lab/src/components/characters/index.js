import * as React from 'react';
export var Character = function (props) {
    var loading = props.loading, data = props.data, error = props.error;
    var hero = data ? data.hero : null;
    return (React.createElement("div", null,
        loading &&
            React.createElement("div", null, "Loading"),
        error &&
            React.createElement("div", null,
                "ERROR ",
                error),
        hero &&
            React.createElement("div", null,
                React.createElement("h3", null, hero.name),
                hero.friends &&
                    hero.friends.map(function (friend) {
                        return friend && (React.createElement("h6", { key: friend.id },
                            friend.name,
                            ":",
                            ' ',
                            friend.appearsIn &&
                                friend.appearsIn.map(function (x) { return x && x.toLowerCase(); }).join(', ')));
                    }))));
};
export default Character;
//# sourceMappingURL=index.js.map