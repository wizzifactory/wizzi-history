<template>
    <div id="app">
        <img src="./assets/logo.png" />
        {{#router}}<router-view></router-view>
        {{else}}<HelloWorld></HelloWorld>
        {{/router}}</div>
    
</template>
<script>
    {{#unless router}}
    import HelloWorld from './components/HelloWorld';
    {{/unless}}
    export default {
            name: 'App', 
            {{#router}}
            {{else}}
            components: {
                HelloWorld
            }, 
            {{/router}}
            
        }
</script>
<style>
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
