<script>
export default {
    props: {
        titulo: String,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <span class="navbar-brand" href="/">Spotify GTS</span>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/">Home</router-link>
                    <router-link to="/types">Link1</router-link>
                    <router-link to="/contacts">Link1</router-link>
                    <router-link to="/newContact">Link1</router-link>ç
                    <router-link to="/about">Link1</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
a {
    margin-left: 20px;
    display: flex;
    align-items: center;
}

a:link,
a:visited,
a:active {
    text-decoration: none;
    color: azure;
}

a:hover {
    color: aqua;
}
</style>