<script>
    import { clearDatabase } from '../utils/stateSync';
    import Button from '../components/Button.svelte';

    const forgetEverything = () => {
        clearDatabase().then(() => {
            window.location.reload();
        });
    };
</script>

<style>
    .settings-panel {
        text-align: right;
    }

    @media (min-width: 1000px) {
        .settings-panel {
            position: fixed;
            right: 10px;
            bottom: 10px;
        }
    }
</style>

<div class="settings-panel">
    <Button on:click={forgetEverything}>Forget everything</Button>
</div>
