/* eslint-disable no-undef */
describe('Application Tests end 2 end', () => {

  let pedidoId = 0;
  let productoSolicitado = 0;
  let productoPorPedido = 0;

  it('displays home page', () => {

    cy.visit('/');

    cy.get('h1').contains('Bienvenido a 3D shopping center');
    cy.get('h2').contains('Aqui encontraras gran cantidad de productos para que personalices y los pidas a tu gusto!!');
  });

  it('displays shopping car without products', () => {

    cy.visit('/carrito');

    cy.get('h2').contains('Aun no tienes productos en el carrito');
    cy.get('h2').parent().children().should(($ch) => {
      expect($ch).to.be.length(1);
      expect(sessionStorage.getItem('pedido')).to.be.null;
    });
  });

  it('displays products page', () => {

    expect(sessionStorage.getItem('pedido')).to.be.null;

    cy.visit('/productos');

    cy.intercept('POST', '/api/pedidos', (req) => {      
      req.continue((res) => {        
        expect(res.statusCode).eq(201);
        pedidoId = parseInt(res.body);
      });
    }).as('pedido');

    cy.intercept('GET', '/api/productos', (req) => {
      req.continue((res) => {
        res.body = [{
          'id': 6,
          'nombre': 'Onix articulado',
          'costo': 15000,
          'tiempo': 40,
          'imagen': 'https://images.cults3d.com/IW9CpJM1Th5c3fYaCqhHZHePVLw=/516x516/https://files.cults3d.com/uploaders/13649867/illustration-file/cccb0865-1b3e-4022-9ae0-6c8d526f9232/265750637_432597711671027_8177134122077968855_n.jpg',
          'created_at': '2021-12-31T22:41:55.733Z',
          'updated_at': '2021-12-31T22:41:55.733Z'
        }];

        expect(res.statusCode).eq(200);
        expect(res.body).to.have.length(1);
      });
    }).as('productos');

    cy.wait('@pedido').then((interception) => {
      expect(interception.request.body).to.have.property('numeroPedido');
      expect(interception.request.body).to.have.property('cliente').eq('');
      expect(interception.request.body).to.have.property('direccion').eq('');
      expect(interception.request.body).to.have.property('estado').eq('inicializando');
      expect(sessionStorage.getItem('pedido')).not.to.be.null;        
    });    
  });
  
  it('select and personalize product without color and material should show error', () => {

    cy.get('div').contains('articulado').should(($div) => {
      expect($div).to.be.length(1);
    }).siblings('button').click();

    cy.get('form').should(($form) => {
      expect($form).to.be.length(1);      
    });

    cy.get('button').contains('Agregar al carrito').click();

    cy.get('span').contains('El campo material es requerido.').should(($span) => {
      expect($span).to.be.length(1);
    });
    cy.get('span').contains('El campo color es requerido.').should(($span) => {
      expect($span).to.be.length(1);
    });

    cy.get('form').siblings('span').click();

    cy.get('form').should(($form) => {
      expect($form).to.be.length(0);      
    });
  });
  
  it('select and personalize product without color should show error', () => {

    cy.get('div').contains('articulado').should(($div) => {
      expect($div).to.be.length(1);
    }).siblings('button').click();

    cy.get('form').should(($form) => {
      expect($form).to.be.length(1);      
    });

    cy.get('select').contains('Material').parent().select('ABS');

    cy.get('button').contains('Agregar al carrito').click();

    cy.get('span').contains('El campo material es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('span').contains('El campo color es requerido.').should(($span) => {
      expect($span).to.be.length(1);
    });

    cy.get('form').siblings('span').click();

    cy.get('form').should(($form) => {
      expect($form).to.be.length(0);      
    });
  });
  
  it('select and personalize product with color and material should create the product', () => {

    cy.intercept('POST', '/api/productos-solicitados', (req) => {      
      req.continue((res) => {        
        expect(res.statusCode).eq(201);
        productoSolicitado = parseInt(res.body);
      });
    }).as('productosolicitado');

    cy.intercept('POST', '/api/productos-por-pedido', (req) => {      
      req.continue((res) => {        
        expect(res.statusCode).eq(201);
        productoPorPedido = parseInt(res.body);
      });
    }).as('productopedido');

    cy.get('div').contains('articulado').should(($div) => {
      expect($div).to.be.length(1);
    }).siblings('button').click();

    cy.get('form').should(($form) => {
      expect($form).to.be.length(1);      
    });

    cy.get('select').contains('Material').parent().select('ABS');
    cy.get('select').contains('Color').parent().select('madera');

    cy.get('button').contains('Agregar al carrito').click();

    
    
    cy.wait('@productosolicitado').then((interception) => {
      expect(interception.request.body).to.have.property('material').eq('ABS');
      expect(interception.request.body).to.have.property('color').eq('madera');
      expect(interception.request.body).to.have.property('urgencia').eq(false);
      expect(interception.request.body.acabado).to.have.property('pulido').eq(false);
      expect(interception.request.body.acabado).to.have.property('pintado').eq(false);
      expect(interception.request.body.acabado).to.have.property('barnizado').eq(false);
    });

    cy.wait('@productopedido').then((interception) => {
      expect(interception.request.body).to.have.property('pedido').eq(pedidoId);
      expect(interception.request.body).to.have.property('cantidad').eq(1);
      expect(interception.request.body).to.have.property('productoSolicitado').eq(productoSolicitado);
    }); 

    cy.get('span').contains('El campo material es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('span').contains('El campo color es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('form').should(($form) => {
      expect($form).to.be.length(0);      
    });
  });

  it('should get the order created up above with selected product', () => {
    
    cy.intercept('GET', `/api/pedidos/${pedidoId}`, (req) => {      
      req.continue((res) => {        
        expect(res.statusCode).eq(200);
      });
    }).as('pedido');
    
    cy.visit('/carrito');
    
    cy.wait('@pedido').then((interception) => {
      expect(interception.response.body).to.have.property('id').eq(pedidoId);
      expect(interception.response.body).to.have.property('numeroPedido');
      expect(interception.response.body).to.have.property('cliente').eq('');
      expect(interception.response.body).to.have.property('direccion').eq('');
      expect(interception.response.body).to.have.property('estado').eq('inicializando');
      expect(interception.response.body).to.have.property('productosSolicitados').to.have.length(1);
      expect(interception.response.body.productosSolicitados[0]).to.have.property('id').eq(productoPorPedido);
    });
  });

  it('should show the product selected, and the order info', () => {
    cy.get('button').contains('Realizar Pedido').parent().siblings('div').should(($orderInfo) => {
      expect($orderInfo).to.be.length(4);
      expect($orderInfo.eq(0)).to.contain('numero de pedido:');
      expect($orderInfo.eq(1)).to.contain('cantidad productos:');
      expect($orderInfo.eq(2)).to.contain('costo total:');
      expect($orderInfo.eq(3)).to.contain('tiempo total:');
    });

    cy.get('div').contains('articulado').parent().children().should(($child) => {
      expect($child).to.be.length(8);
    });
  });

  it('should delete the product and left the order empty', () => {
    cy.get('div').contains('articulado').prev().prev().click();

    cy.get('h2').contains('Aun no tienes productos en el carrito');
    cy.get('h2').parent().children().should(($ch) => {
      expect($ch).to.be.length(1);
    });
  });
    
  it('select and personalize product with all options', () => {

    cy.visit('/productos');

    cy.intercept('POST', '/api/productos-solicitados', (req) => {      
      req.continue((res) => {        
        expect(res.statusCode).eq(201);
        productoSolicitado = parseInt(res.body);
      });
    }).as('productosolicitado');

    cy.intercept('POST', '/api/productos-por-pedido', (req) => {      
      req.continue((res) => {        
        expect(res.statusCode).eq(201);
        productoPorPedido = parseInt(res.body);
      });
    }).as('productopedido');

    cy.get('div').contains('articulado').should(($div) => {
      expect($div).to.be.length(1);
    }).siblings('button').click();

    cy.get('form').should(($form) => {
      expect($form).to.be.length(1);      
    });

    cy.get('select').contains('Material').parent().select('ABS');
    cy.get('select').contains('Color').parent().select('madera');
    cy.get('input[value=pulido]').check().should('be.checked');
    cy.get('input[value=pintado]').check().should('be.checked');
    cy.get('input[value=barnizado]').check().should('be.checked');
    cy.get('input[value=urgencia]').check().should('be.checked');
    cy.get('div').contains('➕').click();
    cy.get('div').contains('➕').click();

    cy.get('button').contains('Agregar al carrito').click();     
    
    cy.wait('@productosolicitado').then((interception) => {
      expect(interception.request.body).to.have.property('material').eq('ABS');
      expect(interception.request.body).to.have.property('color').eq('madera');
      expect(interception.request.body).to.have.property('urgencia').eq(true);
      expect(interception.request.body.acabado).to.have.property('pulido').eq(true);
      expect(interception.request.body.acabado).to.have.property('pintado').eq(true);
      expect(interception.request.body.acabado).to.have.property('barnizado').eq(true);
    });

    cy.wait('@productopedido').then((interception) => {
      expect(interception.request.body).to.have.property('pedido').eq(pedidoId);
      expect(interception.request.body).to.have.property('cantidad').eq(3);
      expect(interception.request.body).to.have.property('productoSolicitado').eq(productoSolicitado);
    }); 

    cy.get('span').contains('El campo material es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('span').contains('El campo color es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('form').should(($form) => {
      expect($form).to.be.length(0);      
    });
  });
  
  it('select and personalize another product with all options', () => {

    cy.intercept('POST', '/api/productos-solicitados', (req) => {      
      req.continue((res) => {        
        expect(res.statusCode).eq(201);
        productoSolicitado = parseInt(res.body);
      });
    }).as('productosolicitado');

    cy.intercept('POST', '/api/productos-por-pedido', (req) => {      
      req.continue((res) => {        
        expect(res.statusCode).eq(201);
        productoPorPedido = parseInt(res.body);
      });
    }).as('productopedido');

    cy.get('div').contains('Skull').should(($div) => {
      expect($div).to.be.length(1);
    }).siblings('button').click();

    cy.get('form').should(($form) => {
      expect($form).to.be.length(1);      
    });

    cy.get('select').contains('Material').parent().select('ABS');
    cy.get('select').contains('Color').parent().select('plata');
    cy.get('input[value=barnizado]').check().should('be.checked');
    cy.get('input[value=urgencia]').check().should('be.checked');

    cy.get('button').contains('Agregar al carrito').click();     
    
    cy.wait('@productosolicitado').then((interception) => {
      expect(interception.request.body).to.have.property('material').eq('ABS');
      expect(interception.request.body).to.have.property('color').eq('plata');
      expect(interception.request.body).to.have.property('urgencia').eq(true);
      expect(interception.request.body.acabado).to.have.property('pulido').eq(false);
      expect(interception.request.body.acabado).to.have.property('pintado').eq(false);
      expect(interception.request.body.acabado).to.have.property('barnizado').eq(true);
    });

    cy.wait('@productopedido').then((interception) => {
      expect(interception.request.body).to.have.property('pedido').eq(pedidoId);
      expect(interception.request.body).to.have.property('cantidad').eq(1);
      expect(interception.request.body).to.have.property('productoSolicitado').eq(productoSolicitado);
    }); 

    cy.get('span').contains('El campo material es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('span').contains('El campo color es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('form').should(($form) => {
      expect($form).to.be.length(0);      
    });
  });
  
  it('should show the product selected, and the order info. should show the order form on Realizar Pedido click', () => {    

    cy.visit('/carrito');

    cy.get('div').contains('articulado').parent().children().should(($child) => {
      expect($child).to.be.length(8);
    });

    cy.get('div').contains('Skull').parent().children().should(($child) => {
      expect($child).to.be.length(8);
    });

    cy.get('button').contains('Realizar Pedido').click();
    
    cy.get('form').should(($form) => {
      expect($form).to.be.length(1);      
    });
  });

  it('Should show error if direction and customer are not filled', () => {
    cy.get('form').children('button').click();

    cy.get('span').contains('El campo direccion es requerido.').should(($span) => {
      expect($span).to.be.length(1);
    });

    cy.get('span').contains('El campo cliente es requerido.').should(($span) => {
      expect($span).to.be.length(1);
    });

    cy.get('form').should(($form) => {
      expect($form).to.be.length(1);      
    });
  });

  it('Should create an Order with all inputs filled', () => {

    
    cy.intercept('PATCH', `/api/pedidos/${pedidoId}`, (req) => {
      req.continue((res) => {        
        expect(res.statusCode).eq(200);
      });
    }).as('pedido');

    cy.get('input[name=direccion]').type('Avenida siempre viva').should('have.value', 'Avenida siempre viva');
    cy.get('input[name=cliente]').type('Homer J. Simpson').should('have.value', 'Homer J. Simpson');

    cy.get('form').children('button').click();
    
    cy.wait('@pedido').then((interception) => {
      expect(interception.request.body).to.have.property('direccion').eq('Avenida siempre viva');
      expect(interception.request.body).to.have.property('cliente').eq('Homer J. Simpson');
      expect(interception.request.body).to.have.property('estado').eq('solicitado');
    });

    cy.get('span').contains('El campo direccion es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('span').contains('El campo cliente es requerido.').should(($span) => {
      expect($span).to.be.length(0);
    });

    cy.get('form').should(($form) => {
      expect($form).to.be.length(0);      
    });
  });
});