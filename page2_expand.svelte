<script>
  import { onMount } from 'svelte';

  let cardTitleContent = '';
  let cardDescriptionContent = '';
  let nestedDataList = [];
  let searchNestedValue = '';
  let noDataMessage = '';

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    cardTitleContent = params.get('title');
    cardDescriptionContent = params.get('description');
    nestedDataList = JSON.parse(decodeURIComponent(params.get('nestedData')));
  });

  function filterNestedData() {
    const searchValueLowerCase = searchNestedValue.toLowerCase();

    return nestedDataList.filter((data) =>
      data.toLowerCase().includes(searchValueLowerCase)
    );
  }
</script>

<style>
  .nested-item {
    padding: 5px;
    border-radius: 4px;
    background-color: #f1f1f1;
    margin-bottom: 5px;
    display: none;
  }

  .nested-item:last-child {
    margin-bottom: 0;
  }
</style>

<div class="content-area">
  <div class="content-header">
    <h2 id="cardTitleContent">{cardTitleContent}</h2>
    <p id="cardDescriptionContent">{cardDescriptionContent}</p>
  </div>
  <input
    type="text"
    id="searchNestedInput"
    placeholder="Search Nested Data..."
    bind:value={searchNestedValue}
    class="w-full px-4 py-2 border border-gray-300 mt-4 transition-shadow focus:shadow-outline"
  />
  <div id="nestedDataContainer">
    {#if nestedDataList.length > 0}
      {#each filterNestedData() as data}
        <div class="nested-item">{data}</div>
      {/each}
    {:else}
      <div class="mt-4">
        {#if noDataMessage}
          {noDataMessage}
        {:else}
          No nested data available.
        {/if}
      </div>
    {/if}
  </div>
</div>
