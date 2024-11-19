<template> 
    <div class="star-rating"> 
      <!-- Loop para criar as 5 estrelas -->
      <span 
        v-for="star in 5" 
        :key="star" 
        class="star" 
        :class="{'filled': star <= rating}" 
        @click="setRating(star)"
      >
        &#9733; <!-- Ícone da estrela -->
      </span> 
    </div> 
  </template> 
  
  <script> 
  export default { 
    props: { 
      rating: { 
        type: Number, 
        default: 0, 
      }, 
    }, 
  
    methods: { 
      // Método para definir a avaliação ao clicar na estrela
      setRating(star) { 
        this.$emit('update:rating', star); // Emite a avaliação selecionada
      }, 
    }, 
  }; 
  </script> 
  
  <style scoped> 
  /* Estilos para o contêiner das estrelas */
  .star-rating { 
    font-size: 24px; 
    cursor: pointer; 
  } 
  
  /* Estilos para as estrelas */
  .star { 
    color: #ccc; 
    transition: color 0.3s; 
  } 
  
  /* Estilo para as estrelas preenchidas */
  .star.filled { 
    color: #f5a623; 
  } 
  </style>
  