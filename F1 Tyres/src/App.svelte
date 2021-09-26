<script>
	/*
		go Lando! // this comment didn't age well
	*/
	
	import ColumnChart from './ColumnChart.svelte';
	import TyreDegradation from './TyreDegradation.svelte';
	import TyreOffset from './TyreOffset.svelte';

	const dataColors = {
		soft: '#da291c',
		medium: '#ffd100',
		hard: '#f0f0ec'
	}
	
	const dataDegradation = [
		{
			key: 'soft',
			value: 0.092,
		},
		{
			key: 'medium',
			value: 0.058,
		},
		{
			key: 'hard',
			value: 0.034,
		}
	]
	
	const dataOffset = [
		{
			key: 'soft',
			value: 0,
		},
		{
			key: 'medium',
			value: 0.61,
		},
		{
			key: 'hard',
			value: 1.03,
		}
	]
</script>

<main>
	<h1>
		F1 tyres
	</h1>
	<p>
		The <a href="https://www.formula1.com/en/latest/article.strategy-guide-what-are-the-possible-race-strategies-for-the-russian-grand.292fIM7raBljiTrw2XRscl.html">F1 website</a> analysed the strategy ahead of the Russian Gran Prix, devoting multiple visuals to <b>tyres</b>. The information is presented in effective charts, but can be repurposed with an <i>artistic flair</i>.
	</p>
	
	<h2>
		Degradation
	</h2>
	
	<p>
		The soft compound deteriorates considerably faster than the harder mixtures.
	</p>
	
	<ColumnChart data="{dataDegradation}" colors="{dataColors}" title="Tyre degradation" measure="Degradation (s/lap)" />
	
	<p>
		<em>How much is left on the termac?</em>
	</p>
	
	<TyreDegradation data="{dataDegradation}" colors="{dataColors}" />
	
	<h2>
		Offset
	</h2>
	
	<p>
		The harder the tyre, the slower the lap.
	</p>
	
	<ColumnChart data="{dataOffset}" colors="{dataColors}" measure="Gap to soft (s/lap)" /> 
	
	<p>
		<em>How's close are the different compounds?</em>
	</p>
	
	<TyreOffset data="{dataOffset}"  colors="{dataColors}"/>
</main>



<style>
	:global(body) {
		background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" opacity="0.1" viewBox="0 0 10 10"%3E%3Cpath d="M 0 10 h 10 v -10" fill="none" stroke="currentColor" /%3E%3C/svg%3E');
		background-size: 10px;
	}
	
	main {
		max-width: 40rem;
		margin: 1rem auto;
	}
	
	main > :global(* + *) {
		margin-top: 0.5em;
	} 
	
	h1, h2 {
		text-transform: capitalize;
	}
	
	main > :global(svg) {
		width: 100%;
		height: auto;
		display: block;
		margin-bottom: 2em;
	}
</style>
