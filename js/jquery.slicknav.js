;(function ($, document, window) {
    var
  // Objeto com as configurações padrão
        defaults = {
            label: 'MENU',
            duplicate: true,
            duration: 200,
            easingOpen: 'swing',
            easingClose: 'swing',
            closedSymbol: '&#9658;',
            openedSymbol: '&#9660;',
            prependTo: 'body',
            appendTo: '',
            parentTag: 'a',
            closeOnClick: false,
            allowParentLinks: false,
            nestedParentLinks: true,
            showChildren: false,
            removeIds: true,
            removeClasses: false,
            removeStyles: false,
			brand: '',
            animations: 'jquery',
            init: function () {},
            beforeOpen: function () {},
            beforeClose: function () {},
            afterOpen: function () {},
            afterClose: function () {}
        },
        mobileMenu = 'slicknav',
        prefix = 'slicknav',

        Keyboard = {
            DOWN: 40,
            ENTER: 13,
            ESCAPE: 27,
            LEFT: 37,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
        };

    function Plugin(element, options) {
        this.element = element;

        
        this.settings = $.extend({}, defaults, options);

  
        if (!this.settings.duplicate && !options.hasOwnProperty("removeIds")) {
          this.settings.removeIds = false;
        }

        this._defaults = defaults;
        this._name = mobileMenu;

        this.init();
    }

    Plugin.prototype.init = function () {
        var $this = this,
            menu = $(this.element),
            settings = this.settings,
            iconClass,
            menuBar;

       // clonar menu se necessário
        if (settings.duplicate) {
            $this.mobileNav = menu.clone();
        } else {
            $this.mobileNav = menu;
        }

        // remover ID se definido
        if (settings.removeIds) {
          $this.mobileNav.removeAttr('id');
          $this.mobileNav.find('*').each(function (i, e) {
              $(e).removeAttr('id');
          });
        }

        // / remover classes se definido
        if (settings.removeClasses) {
            $this.mobileNav.removeAttr('class');
            $this.mobileNav.find('*').each(function (i, e) {
                $(e).removeAttr('class');
            });
        }

        // remove stylos se definido
        if (settings.removeStyles) {
            $this.mobileNav.removeAttr('style');
            $this.mobileNav.find('*').each(function (i, e) {
                $(e).removeAttr('style');
            });
        }

     // classe de estilo para o botão
        iconClass = prefix + '_icon';

        if (settings.label === '') {
            iconClass += ' ' + prefix + '_no-text';
        }

        if (settings.parentTag == 'a') {
            settings.parentTag = 'a href="#"';
        }

        // menu  barra 
        $this.mobileNav.attr('class', prefix + '_nav');
        menuBar = $('<div class="' + prefix + '_menu"></div>');
		if (settings.brand !== '') {
			var brand = $('<div class="' + prefix + '_brand">'+settings.brand+'</div>');
			$(menuBar).append(brand);
		}
        $this.btn = $(
            ['<' + settings.parentTag + ' aria-haspopup="true" role="button" tabindex="0" class="' + prefix + '_btn ' + prefix + '_collapsed">',
                '<span class="' + prefix + '_menutxt">' + settings.label + '</span>',
                '<span class="' + iconClass + '">',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                '</span>',
            '</' + settings.parentTag + '>'
            ].join('')
        );
        $(menuBar).append($this.btn);
        if(settings.appendTo !== '') {
            $(settings.appendTo).append(menuBar);
        } else {
            $(settings.prependTo).prepend(menuBar);
        }
        menuBar.append($this.mobileNav);

        // iterar sobre a estrutura adicionando estrutura adicional
        var items = $this.mobileNav.find('li');
        $(items).each(function () {
            var item = $(this),
                data = {};
            data.children = item.children('ul').attr('role', 'menu');
            item.data('menu', data);

             // se um item da lista tiver um menu aninhado
            if (data.children.length > 0) {

                // selecionar todo o texto antes do menu filho // verificar se há âncoras

                var a = item.contents(),
                    containsAnchor = false,
                    nodes = [];

                $(a).each(function () {
                    if (!$(this).is('ul')) {
                        nodes.push(this);
                    } else {
                        return false;
                    }

                    if($(this).is("a")) {
                        containsAnchor = true;
                    }
                });

                var wrapElement = $(
                    '<' + settings.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + prefix + '_item"/>'
                );

              // envolver o texto do item com uma tag e adicionar classes, a menos que estejamos separando links pai
              
                if ((!settings.allowParentLinks || settings.nestedParentLinks) || !containsAnchor) {
                    var $wrap = $(nodes).wrapAll(wrapElement).parent();
                    $wrap.addClass(prefix+'_row');
                } else
                    $(nodes).wrapAll('<span class="'+prefix+'_parent-link '+prefix+'_row"/>').parent();

                if (!settings.showChildren) {
                    item.addClass(prefix+'_collapsed');
                } else {
                    item.addClass(prefix+'_open');
                }

                item.addClass(prefix+'_parent');

                // criar seta pai. Envolver com link se houver links pai e separação
                var arrowElement = $('<span class="'+prefix+'_arrow">'+(settings.showChildren?settings.openedSymbol:settings.closedSymbol)+'</span>');

                if (settings.allowParentLinks && !settings.nestedParentLinks && containsAnchor)
                    arrowElement = arrowElement.wrap(wrapElement).parent();

                //anexar arrow
                $(nodes).last().after(arrowElement);


            } else if ( item.children().length === 0) {
                 item.addClass(prefix+'_txtnode');
            }

            // accessibility for links
            item.children('a').attr('role', 'menuitem').click(function(event){
                // Certifique-se de que não seja um pai
                if (settings.closeOnClick && !$(event.target).parent().closest('li').hasClass(prefix+'_parent')) {
                        // Emular o fechamento do menu se definido
                        $($this.btn).click();
                    }
            });

            // também fechar ao clicar se os links pai estiverem definidos
            if (settings.closeOnClick && settings.allowParentLinks) {
                item.children('a').children('a').click(function (event) {
                    // Emular o fechamento do menu
                    $($this.btn).click();
                });

                item.find('.'+prefix+'_parent-link a:not(.'+prefix+'_item)').click(function(event){
                    // Emular o fechamento do menu
                        $($this.btn).click();
                });
            }
        });

        // a estrutura está no lugar, agora ocultar os itens apropriados
        $(items).each(function () {
            var data = $(this).data('menu');
            if (!settings.showChildren){
                $this._visibilityToggle(data.children, null, false, null, true);
            }
        });

         // finalmente alternar todo o menu
        $this._visibilityToggle($this.mobileNav, null, false, 'init', true);

        // acessibilidade para o botão do menu
        $this.mobileNav.attr('role','menu');

        // prevenção de contorno quando usando o mouse
        $(document).mousedown(function(){
            $this._outlines(false);
        });

        $(document).keyup(function(){
            $this._outlines(true);
        });

        // menu button click
        $($this.btn).click(function (e) {
            e.preventDefault();
            $this._menuToggle();
        });

        // click on menu parent
        $this.mobileNav.on('click', '.' + prefix + '_item', function (e) {
            e.preventDefault();
            $this._itemClick($(this));
        });

        // verificar eventos de teclado no botão do menu e nos pais dos menus
        $($this.btn).keydown(function (e) {
            var ev = e || event;

            switch(ev.keyCode) {
                case Keyboard.ENTER:
                case Keyboard.SPACE:
                case Keyboard.DOWN:
                    e.preventDefault();
                    if (ev.keyCode !== Keyboard.DOWN || !$($this.btn).hasClass(prefix+'_open')){
                        $this._menuToggle();
                    }
                    
                    $($this.btn).next().find('[role="menuitem"]').first().focus();
                    break;
            }

            
        });

        $this.mobileNav.on('keydown', '.'+prefix+'_item', function(e) {
            var ev = e || event;

            switch(ev.keyCode) {
                case Keyboard.ENTER:
                    e.preventDefault();
                    $this._itemClick($(e.target));
                    break;
                case Keyboard.RIGHT:
                    e.preventDefault();
                    if ($(e.target).parent().hasClass(prefix+'_collapsed')) {
                        $this._itemClick($(e.target));
                    }
                    $(e.target).next().find('[role="menuitem"]').first().focus();
                    break;
            }
        });

        $this.mobileNav.on('keydown', '[role="menuitem"]', function(e) {
            var ev = e || event;

            switch(ev.keyCode){
                case Keyboard.DOWN:
                    e.preventDefault();
                    var allItems = $(e.target).parent().parent().children().children('[role="menuitem"]:visible');
                    var idx = allItems.index( e.target );
                    var nextIdx = idx + 1;
                    if (allItems.length <= nextIdx) {
                        nextIdx = 0;
                    }
                    var next = allItems.eq( nextIdx );
                    next.focus();
                break;
                case Keyboard.UP:
                    e.preventDefault();
                    var allItems = $(e.target).parent().parent().children().children('[role="menuitem"]:visible');
                    var idx = allItems.index( e.target );
                    var next = allItems.eq( idx - 1 );
                    next.focus();
                break;
                case Keyboard.LEFT:
                    e.preventDefault();
                    if ($(e.target).parent().parent().parent().hasClass(prefix+'_open')) {
                        var parent = $(e.target).parent().parent().prev();
                        parent.focus();
                        $this._itemClick(parent);
                    } else if ($(e.target).parent().parent().hasClass(prefix+'_nav')){
                        $this._menuToggle();
                        $($this.btn).focus();
                    }
                    break;
                case Keyboard.ESCAPE:
                    e.preventDefault();
                    $this._menuToggle();
                    $($this.btn).focus();
                    break;    
            }
        });

         // permitir que links sejam clicáveis dentro de tags pai se definido
        if (settings.allowParentLinks && settings.nestedParentLinks) {
            $('.'+prefix+'_item a').click(function(e){
                    e.stopImmediatePropagation();
            });
        }
    };

    //toggle menu
    Plugin.prototype._menuToggle = function (el) {
        var $this = this;
        var btn = $this.btn;
        var mobileNav = $this.mobileNav;

        if (btn.hasClass(prefix+'_collapsed')) {
            btn.removeClass(prefix+'_collapsed');
            btn.addClass(prefix+'_open');
        } else {
            btn.removeClass(prefix+'_open');
            btn.addClass(prefix+'_collapsed');
        }
        btn.addClass(prefix+'_animating');
        $this._visibilityToggle(mobileNav, btn.parent(), true, btn);
    };

    // toggle clicked items
    Plugin.prototype._itemClick = function (el) {
        var $this = this;
        var settings = $this.settings;
        var data = el.data('menu');
        if (!data) {
            data = {};
            data.arrow = el.children('.'+prefix+'_arrow');
            data.ul = el.next('ul');
            data.parent = el.parent();
            //Separated parent link structure
            if (data.parent.hasClass(prefix+'_parent-link')) {
                data.parent = el.parent().parent();
                data.ul = el.parent().next('ul');
            }
            el.data('menu', data);
        }
        if (data.parent.hasClass(prefix+'_collapsed')) {
            data.arrow.html(settings.openedSymbol);
            data.parent.removeClass(prefix+'_collapsed');
            data.parent.addClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        } else {
            data.arrow.html(settings.closedSymbol);
            data.parent.addClass(prefix+'_collapsed');
            data.parent.removeClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        }
    };

 // alternar a visibilidade real e as tags de acessibilidade
    Plugin.prototype._visibilityToggle = function(el, parent, animate, trigger, init) {
        var $this = this;
        var settings = $this.settings;
        var items = $this._getActionItems(el);
        var duration = 0;
        if (animate) {
            duration = settings.duration;
        }
        
        function afterOpen(trigger, parent) {
            $(trigger).removeClass(prefix+'_animating');
            $(parent).removeClass(prefix+'_animating');

            //iniciar o callback depois de aberto
            if (!init) {
                settings.afterOpen(trigger);
            }
        }
        
        function afterClose(trigger, parent) {
            el.attr('aria-hidden','true');
            items.attr('tabindex', '-1');
            $this._setVisAttr(el, true);
            el.hide(); //jQuery 1.7 bug fix

            $(trigger).removeClass(prefix+'_animating');
            $(parent).removeClass(prefix+'_animating');

            //Fire init or afterClose callback
            if (!init){
                settings.afterClose(trigger);
            } else if (trigger == 'init'){
                settings.init();
            }
        }

        if (el.hasClass(prefix+'_hidden')) {
            el.removeClass(prefix+'_hidden');
             //Fire beforeOpen callback
            if (!init) {
                settings.beforeOpen(trigger);
            }
            if (settings.animations === 'jquery') {
                el.stop(true,true).slideDown(duration, settings.easingOpen, function(){
                    afterOpen(trigger, parent);
                });
            } else if(settings.animations === 'velocity') {
                el.velocity("finish").velocity("slideDown", {
                    duration: duration,
                    easing: settings.easingOpen,
                    complete: function() {
                        afterOpen(trigger, parent);
                    }
                });
            }
            el.attr('aria-hidden','false');
            items.attr('tabindex', '0');
            $this._setVisAttr(el, false);
        } else {
            el.addClass(prefix+'_hidden');

            //Fire init or beforeClose callback
            if (!init){
                settings.beforeClose(trigger);
            }

            if (settings.animations === 'jquery') {
                el.stop(true,true).slideUp(duration, this.settings.easingClose, function() {
                    afterClose(trigger, parent)
                });
            } else if (settings.animations === 'velocity') {
                
                el.velocity("finish").velocity("slideUp", {
                    duration: duration,
                    easing: settings.easingClose,
                    complete: function() {
                        afterClose(trigger, parent);
                    }
                });
            }
        }
    };

    // definir atributos do elemento e dos filhos com base na visibilidade
    Plugin.prototype._setVisAttr = function(el, hidden) {
        var $this = this;

        // select all parents that aren't hidden
        var nonHidden = el.children('li').children('ul').not('.'+prefix+'_hidden');

        // iterate over all items setting appropriate tags
        if (!hidden) {
            nonHidden.each(function(){
                var ul = $(this);
                ul.attr('aria-hidden','false');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '0');
                $this._setVisAttr(ul, hidden);
            });
        } else {
            nonHidden.each(function(){
                var ul = $(this);
                ul.attr('aria-hidden','true');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '-1');
                $this._setVisAttr(ul, hidden);
            });
        }
    };

 // obter todos os itens de primeiro nível que são clicáveis
    Plugin.prototype._getActionItems = function(el) {
        var data = el.data("menu");
        if (!data) {
            data = {};
            var items = el.children('li');
            var anchors = items.find('a');
            data.links = anchors.add(items.find('.'+prefix+'_item'));
            el.data('menu', data);
        }
        return data.links;
    };

    Plugin.prototype._outlines = function(state) {
        if (!state) {
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','none');
        } else {
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','');
        }
    };

    Plugin.prototype.toggle = function(){
        var $this = this;
        $this._menuToggle();
    };

    Plugin.prototype.open = function(){
        var $this = this;
        if ($this.btn.hasClass(prefix+'_collapsed')) {
            $this._menuToggle();
        }
    };

    Plugin.prototype.close = function(){
        var $this = this;
        if ($this.btn.hasClass(prefix+'_open')) {
            $this._menuToggle();
        }
    };

    $.fn[mobileMenu] = function ( options ) {
        var args = arguments;

       // O primeiro parâmetro é um objeto (opções) ou foi omitido, instanciar uma nova instância
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Permitir que o plugin seja instanciado apenas uma vez devido a métodos
                if (!$.data(this, 'plugin_' + mobileMenu)) {

                    // se não tiver uma instância, crie uma nova, passe as opções para o nosso construtor de plugin, // e armazene a instância do plugin no objeto de dados jQuery dos elementos.

                    $.data(this, 'plugin_' + mobileMenu, new Plugin( this, options ));
                }
            });

        // Se for uma string e não começar com um underscore ou a função 'init', trate isso como uma chamada para um método público.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Armazenar em cache a chamada do método para que seja possível retornar um valor
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + mobileMenu);

               // Verifica se já existe uma instância do plugin e verifica se o método público solicitado existe

                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Chamar o método da nossa instância de plugin e passar a ele os argumentos fornecidos.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });

            // Se o método armazenado em cache anterior retornar um valor, retorne o valor, caso contrário, retorne este para preservar a encadeamento.
            return returns !== undefined ? returns : this;
        }
    };
}(jQuery, document, window));
