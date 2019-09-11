<script>
    import { businesses } from '../../stores/businesses.js';
    import { staff } from '../../stores/staff.js';
    import { businessTypes } from '../../utils/business';
    import Button from '../../components/Button.svelte';
    import RangeSlider from '../../components/RangeSlider.svelte';

    export let business;

    $: maxStaffMembers = () => {
        if (!business) return 0;

        if (business.staff + $staff.members > businessTypes[business.type].staffMax) {
            return businessTypes[business.type].staffMax;
        }

        return business.staff + $staff.members;
    };

    const changeStaffMembers = value => {
        value = parseInt(value, 10);

        if (value > business.staff) {
            // Add more crew members to ship
            staff.remove(value - business.staff);
        } else {
            // Remove crew members from ship
            staff.add(business.staff - value);
        }

        businesses.changeStaff(business.id, value);
    };
</script>

<style>
    .slider-container {
        width: 50%;
    }

    .slider-container > div {
        background: #fff;
        padding: 0.5em;
        margin-bottom: 1.5em;
    }
</style>

<div class="component-businesscontents">
    <h3>Rearrange business contents</h3>

    <div class="slider-container">
        <div>
            <RangeSlider
                value={business.crewMembers}
                max={maxStaffMembers()}
                on:input={e => changeStaffMembers(e.target.value)}
                label="👫 Crew members onboard <strong>({business.crewMembers} onboard)</strong>" />
            {$staff.members} more available
        </div>
    </div>
</div>
