<script>
    import { crew } from '../stores/crew.js';
    import { goods } from '../stores/goods.js';
</script>

<div>
    <button on:click={() => crew.addCrewMembers(1)}>Find crew member</button>
    <button on:click={() => crew.removeCrewMembers(1)}>Fire crew member</button>
</div>

<div>
    <button on:click={() => goods.add('food', 10)}>Buy food</button>
    <button disabled={$goods.food <= 0} on:click={() => goods.remove('food', 10)}>Sell food</button>
    <button on:click={() => goods.add('water', 10)}>Buy water</button>
    <button disabled={$goods.water <= 0} on:click={() => goods.remove('water', 10)}>Sell water</button>
</div>
