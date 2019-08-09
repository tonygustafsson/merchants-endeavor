<script>
    import { ships } from './stores/ships.js';
    import { crew } from './stores/crew.js';

    let noOfShips = 0;

    ships.subscribe(value => {
        noOfShips = value.ships.length;
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
</table>
