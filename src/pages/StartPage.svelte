<script>
    import { merchant } from '../stores/merchant';
    import { game } from '../stores/game';
    import { resolution } from '../stores/resolution';
    import { log } from '../stores/log';
    import Button from '../components/Button.svelte';
    import TextInput from '../components/TextInput.svelte';
    import SelectBox from '../components/SelectBox.svelte';

    const changeName = name => {
        merchant.changeName(name);
    };

    const changeGender = gender => {
        merchant.changeGender(gender);
    };

    const changeNationality = nationality => {
        merchant.changeNationality(nationality);
    };

    const startPlaying = () => {
        game.startPlaying();
        const route = $resolution.mobile ? 'inventory' : 'properties';
        game.changeRoute(route);
        log.add(`You just woke as a ${$merchant.nationality} merchant named ${$merchant.name}.`);
    };

    $: genderIcon = '👩';
    $: flagIcon = '🇬🇧';

    merchant.subscribe(value => {
        if (!value.nationality || !value.gender) return;

        genderIcon = value.gender === 'woman' ? '👩' : '👨';

        switch (value.nationality) {
            case 'english':
                flagIcon = '🇬🇧';
                break;
            case 'french':
                flagIcon = '🇫🇷';
                break;
            case 'spanish':
                flagIcon = '🇪🇸';
                break;
            case 'dutch':
                flagIcon = '🇧🇶';
                break;
            default:
                flagIcon = '🇬🇧';
        }
    });
</script>

<style>
    form {
        width: 50%;
    }
</style>

<div class="page-start">
    <h2>Welcome</h2>

    <p>To start playing, you can edit your profile or just press Play.</p>

    <form on:submit|preventDefault={startPlaying}>
        <TextInput value={$merchant.name} label="📛 Name" name="name" on:change={e => changeName(e.target.value)} />

        <SelectBox name="gender" label="{genderIcon} Gender" on:change={e => changeGender(e.target.value)}>
            <option value="man" selected={$merchant.gender === 'man'}>Man</option>
            <option value="woman" selected={$merchant.gender === 'woman'}>Woman</option>
        </SelectBox>

        <SelectBox name="nationality" label="{flagIcon} Nationality" on:change={e => changeNationality(e.target.value)}>
            <option value="english" selected={$merchant.nationality === 'english'}>English</option>
            <option value="french" selected={$merchant.nationality === 'french'}>French</option>
            <option value="spanish" selected={$merchant.nationality === 'spanish'}>Spanish</option>
            <option value="dutch" selected={$merchant.nationality === 'dutch'}>Dutch</option>
        </SelectBox>

        <div>
            <Button type="submit">Play</Button>
        </div>
    </form>
</div>
