function toggleBoxBody(boxId) {
    var boxBody = document.getElementById(boxId).querySelector('.box-body');
    boxBody.style.display = (boxBody.style.display === 'block') ? 'none' : 'block';
  }
  