<script>
  import { onMount } from 'svelte';

  let searchValue = '';
  let cardTitleContent = '';
  let cardDescriptionContent = '';
  let nestedDataList = [];
  let showModal = false;
  let cardTitle = '';
  let cardDescription = '';
  let nestedDataInput = '';

  const cardData = [
    { title: 'Toyota', description: 'Japanese car manufacturer' },
    { title: 'Ford', description: 'American car manufacturer' },
    { title: 'Honda', description: 'Japanese car manufacturer' }
  ];

  onMount(() => {
    const addCardButton = document.getElementById('addCardBtn');
    const modal = document.getElementById('modal');

    addCardButton.addEventListener('click', () => {
      showModal = true;
    });

    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        showModal = false;
      }
    });
  });

  function searchCards() {
    const searchValueLowerCase = searchValue.toLowerCase();

    return cardData.filter(
      (card) =>
        card.title.toLowerCase().includes(searchValueLowerCase) ||
        card.description.toLowerCase().includes(searchValueLowerCase)
    );
  }

  function addCard() {
    const newCard = {
      title: cardTitle,
      description: cardDescription
    };

    cardData.push(newCard);

    cardTitle = '';
    cardDescription = '';
    nestedDataInput = '';

    showModal = false;
  }

  function expandCard(title, description) {
    cardTitleContent = title;
    cardDescriptionContent = description;
    nestedDataList = nestedData[title];

    const url = `expanded?title=${encodeURIComponent(title)}&description=${encodeURIComponent(
      description
    )}&nestedData=${encodeURIComponent(JSON.stringify(nestedDataList))}`;

    window.open(url, '_blank');
  }
</script>

<style>
  /* Sidebar */
  .sidebar {
    width: 250px;
    background-color: #f1f1f1;
    position: fixed;
    left: 0;
    height: 100%;
    overflow: hidden;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: width 0.3s ease;
  }

  .collapsible {
    background-color: #333;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
    display: flex;
    align-items: center;
  }

  .collapsible:hover {
    background-color: #444;
  }

  .collapsible:after {
    content: '\002B';
    color: white;
    font-weight: bold;
    float: right;
    margin-left: 5px;
    transition: transform 0.3s ease;
  }

  .collapsible.active:after {
    content: "\2212";
    transform: rotate(90deg);
  }

  .content {
    padding: 0 18px;
    overflow: hidden;
    background-color: #f1f1f1;
  }

  /* Cards */
  .card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card h3 {
    margin-top: 0;
  }

  .card p {
    margin-bottom: 0;
  }

  /* Search Input */
  #searchInput {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    margin-top: 10px;
    box-sizing: border-box;
    transition: box-shadow 0.3s ease;
  }

  #searchInput:focus {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }

  /* Add Card Button */
  #addCardBtn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  #addCardBtn:hover {
    background-color: #45a049;
  }

  /* Modal */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  #saveCardBtn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  #saveCardBtn:hover {
    background-color: #45a049;
  }

  /* Content Area */
  .content-area {
    margin-left: 250px;
    padding: 20px;
  }

  .content-header {
    margin-bottom: 20px;
  }

  /* Expanded Button */
  #expandButton {
    padding: 10px;
    border: none;
    background-color: #45a049;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>

<div class="sidebar">
  <button
    class="collapsible"
    on:click={() => {
      const content = document.querySelector('.content');
      content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;
    }}
  >
    Sidebar
  </button>
  <div class="content">
    <input
      type="text"
      id="searchInput"
      placeholder="Search..."
      bind:value={searchValue}
      class="w-full px-4 py-2 border border-gray-300 mt-4 transition-shadow focus:shadow-outline"
    />
    <div id="cardContainer">
      {#each searchCards() as card}
        <div class="card">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      {/each}
    </div>
    <button
      id="addCardBtn"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Add Card
    </button>
  </div>
</div>

<div class="content-area">
  <div class="content-header">
    <h2 id="cardTitleContent">{cardTitleContent}</h2>
    <p id="cardDescriptionContent">{cardDescriptionContent}</p>
    <button
      id="expandButton"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      on:click={() => expandCard(cardTitleContent, cardDescriptionContent)}
    >
      Expand
    </button>
  </div>
  <div id="detailsContainer"></div>
  <input
    type="text"
    id="searchNestedInput"
    placeholder="Search Nested Data..."
    class="w-full px-4 py-2 border border-gray-300 mt-4 transition-shadow focus:shadow-outline"
  />
  <div id="nestedDataContainer">
    {#if nestedDataList.length > 0}
      <ul class="nested-list">
        {#each nestedDataList as data}
          <li class="nested-item">{data}</li>
        {/each}
      </ul>
    {:else}
      <div class="mt-4">
        {#if noDataMessage}
          {noDataMessage}
        {:else}
          No matching nested data found.
        {/if}
      </div>
    {/if}
  </div>
</div>

<div
  id="modal"
  class="modal"
  class:invisible={!showModal}
  on:click={() => showModal = false}
>
  <div class="modal-content bg-white mx-auto my-24 p-8 rounded shadow-lg max-w-md">
    <span
      class="close absolute cursor-pointer"
      style="top: 20px; right: 20px;"
      on:click={() => showModal = false}
    >
      &times;
    </span>
    <h2 class="text-lg font-semibold mb-4">Add New Card</h2>
    <input
      type="text"
      id="cardTitle"
      placeholder="Card Title"
      bind:value={cardTitle}
      class="w-full px-4 py-2 border border-gray-300 mb-4 transition-shadow focus:shadow-outline"
    />
    <textarea
      id="cardDescription"
      placeholder="Card Description"
      bind:value={cardDescription}
      class="w-full px-4 py-2 border border-gray-300 mb-4 transition-shadow focus:shadow-outline"
    ></textarea>
    <input
      type="text"
      id="nestedDataInput"
      placeholder="Nested Data (comma-separated)"
      bind:value={nestedDataInput}
      class="w-full px-4 py-2 border border-gray-300 mb-4 transition-shadow focus:shadow-outline"
    />
    <button
      id="saveCardBtn"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      on:click={addCard}
    >
      Save
    </button>
  </div>
</div>
