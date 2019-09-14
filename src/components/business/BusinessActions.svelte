<script>
    import { businesses } from '../../stores/businesses.js';
    import { merchant } from '../../stores/merchant.js';
    import { businessTypes } from '../../utils/business';
    import { staff } from '../../stores/staff.js';
    import { game } from '../../stores/game';
    import { log } from '../../stores/log';
    import Button from '../../components/Button.svelte';
    import TextInput from '../../components/TextInput.svelte';

    export let business;

    const sellBusiness = business => {
        // Return business staff members
        staff.add(business.staff);

        // Sell ship
        const worth = businessTypes[business.type].price;
        businesses.remove(business.id);
        merchant.addDoubloons(worth);
        log.add(`You sold your ${business.type} ${business.name} for ${worth} dbl.`);

        // Go back to Property page
        game.changeRoute('properties');
    };

    const renameBusiness = (business, newName) => {
        businesses.setName(business.id, newName);
        log.add(`You renamed your ${business.type} from ${business.name} to ${newName}.`);
    };

    const takeProfit = () => {
        merchant.addDoubloons(business.profit);
        businesses.takeProfit(business.id);
        log.add(`You took profit from your ${business.type} ${business.name} and got ${business.profit}.`);
    };
</script>

<div class="component-businessactions">
    <h3>Actions</h3>

    <div>
        <TextInput
            label="Business name"
            name="business-name"
            value={business.name}
            on:change={e => renameBusiness(business, e.target.value)} />
        <Button>📛 Change name</Button>

        <Button on:click={() => sellBusiness(business)}>💰 Sell the business</Button>
        <Button disabled={business.profit <= 0} on:click={() => takeProfit()}>💰 Take profit</Button>
    </div>
</div>
