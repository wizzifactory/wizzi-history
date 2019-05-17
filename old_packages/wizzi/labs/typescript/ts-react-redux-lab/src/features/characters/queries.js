import * as tslib_1 from "tslib";
import gql from 'graphql-tag';
export var GetCharacter = gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  query GetCharacter($episode: Episode!) {\n    hero(episode: $episode) {\n      name\n      id\n      friends {\n        name\n        id\n        appearsIn\n      }\n    }\n  }\n"], ["\n  query GetCharacter($episode: Episode!) {\n    hero(episode: $episode) {\n      name\n      id\n      friends {\n        name\n        id\n        appearsIn\n      }\n    }\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=queries.js.map