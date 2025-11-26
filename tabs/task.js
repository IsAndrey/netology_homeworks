const tabs1 = document.getElementById("tabs1");

function tabManager(element) {
  const tab = element.getElementsByClassName("tab");
  const tabContent = element.getElementsByClassName("tab__content");
  
  // name имя класса(ов)
  // collection коллекция элементов
  // index индекс элемента в коллекции
  function setClassName(name, collection, index) {
    if (index < collection.length) {
      collection[index].className = name;
    }
  }
  
  element.addEventListener(
    "click",
    function(e) {
      for (i = 0; i < tab.length; i++) {
        if (e.target === tab[i]) {
          setClassName("tab tab_active", tab, i);
          setClassName(
            "tab__content tab__content_active", tabContent, i
          );
        } else {
          setClassName("tab", tab, i);
          setClassName("tab__content", tabContent, i);
        }
      }
    }
  );
}

tabManager(tabs1)
