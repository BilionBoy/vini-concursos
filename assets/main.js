(function () {
  "use strict"

  var menu = document.getElementById("navigation")
  var toggle = document.querySelector(".menu-toggle")
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.navigation a[href^="#"]'))
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"))
  var dialog = document.querySelector(".evidence-dialog")
  var galleryTrigger = document.querySelector(".gallery-trigger")
  var dialogClose = document.querySelector(".dialog__close")
  var root = document.documentElement

  function isMenuOpen() { return toggle.getAttribute("aria-expanded") === "true" }

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open))
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu")
    menu.classList.toggle("is-open", open)
  }

  function closeMenu() { setMenu(false) }

  toggle.addEventListener("click", function () { setMenu(!isMenuOpen()) })
  Array.prototype.forEach.call(menu.querySelectorAll("a"), function (link) { link.addEventListener("click", closeMenu) })

  window.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu()
  })

  window.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !isMenuOpen()) return
    closeMenu()
    toggle.focus()
  })

  var desktopQuery = window.matchMedia("(min-width: 901px)")
  function onDesktopChange() { if (desktopQuery.matches) closeMenu() }
  if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onDesktopChange)
  else desktopQuery.addListener(onDesktopChange)

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting })
      if (!visible.length) return
      var id = visible[0].target.id
      navLinks.forEach(function (link) {
        var active = link.hash === "#" + id
        link.classList.toggle("is-active", active)
        if (active) link.setAttribute("aria-current", "location")
        else link.removeAttribute("aria-current")
      })
    }, { rootMargin: "-5% 0px -65% 0px", threshold: 0 })
    sections.forEach(function (section) { observer.observe(section) })
  }

  function openDialog() {
    closeMenu()
    if (typeof dialog.showModal === "function") dialog.showModal()
    else dialog.setAttribute("open", "")
    root.classList.add("dialog-open")
  }

  function closeDialog() {
    if (typeof dialog.close === "function") dialog.close()
    else dialog.removeAttribute("open")
    root.classList.remove("dialog-open")
  }

  galleryTrigger.addEventListener("click", openDialog)
  dialogClose.addEventListener("click", closeDialog)
  dialog.addEventListener("close", function () { root.classList.remove("dialog-open") })
  dialog.addEventListener("click", function (event) {
    if (event.target !== dialog) return
    var rect = dialog.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog()
  })
})()
