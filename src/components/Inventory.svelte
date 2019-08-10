<script>
    import { goods } from '../stores/goods.js';
</script>

<h3>Inventory</h3>

<table>
    <tr>
        <th>Item</th>
        <th>Quantity</th>
    </tr>
    <tr>
        <td>Cannons</td>
        <td>{$goods.cannons}</td>
    </tr>
    <tr>
        <td>Doubloons</td>
        <td>{$goods.doubloons}</td>
    </tr>
    <tr>
        <td>Food</td>
        <td>{$goods.food} cartons</td>
    </tr>
    <tr>
        <td>Water</td>
        <td>{$goods.water} barrels</td>
    </tr>
    <tr>
        <td>Spices</td>
        <td>{$goods.spices} cartons</td>
    </tr>
    <tr>
        <td>Porcelain</td>
        <td>{$goods.porcelain} cartons</td>
    </tr>
    <tr>
        <td>Tobacco</td>
        <td>{$goods.tobacco} cartons</td>
    </tr>
    <tr>
        <td>Rum</td>
        <td>{$goods.rum} barrels</td>
    </tr>
</table>

<div>
    <button on:click={() => goods.add('food', 10)}>Buy food</button>
    <button disabled={$goods.food <= 0} on:click={() => goods.remove('food', 10)}>Sell food</button>
    <button on:click={() => goods.add('water', 10)}>Buy water</button>
    <button disabled={$goods.water <= 0} on:click={() => goods.remove('water', 10)}>Sell water</button>
</div>
