<script>
    import { ships } from '../stores/ships.js';
    import { crew } from '../stores/crew.js';
    import { goods } from '../stores/goods.js';

    let noOfShips = 0;

    ships.subscribe(value => {
        noOfShips = value.length;
    });
</script>

<h3>Inventory</h3>

<table>
    <tr>
        <th>Item</th>
        <th>Quantity</th>
    </tr>
    <tr>
        <td>Crew members</td>
        <td>{$crew}</td>
    </tr>
    <tr>
        <td>Ships</td>
        <td>{noOfShips}</td>
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
</table>
