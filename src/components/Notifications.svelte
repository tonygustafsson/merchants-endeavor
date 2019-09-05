<script>
    $: showNotification = false;

    let notification;

    export const success = message => {
        notification = message;
        showNotification = true;

        setTimeout(() => {
            showNotification = false;
        }, 2000);
    };
</script>

<style>
    .notification {
        position: fixed;
        bottom: 10px;
        left: 0;
        width: 80%;
        margin: 0 10%;
        background-color: rgb(207, 255, 163);
        padding: 1em;
        transform: translateY(100px);
        transition: transform 200ms;
    }
    .show {
        transform: translateY(0);
    }
</style>

<div class="notification" class:show={showNotification}>
    <p>{notification}</p>
</div>
