<template>
    <div>
        <p>hallo{{ message }}</p>
    </div>
</template>
<script>
    export default {
        name: "CardComponent",
        props: ['message'],
    }
</script>