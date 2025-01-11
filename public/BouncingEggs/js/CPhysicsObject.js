function CPhysicsObject() {
    var _bContactOccured;      //maybe this is to delete.

    var _oWorld;

    var _oGame;
    var _oPhysicController;

    this.init = function () {
        _bContactOccured = false;

        _oPhysicController = s_oPhysicsController.getInstance();
        _oGame = s_oGame;
        _oWorld = _oPhysicController.getWorld();

    };

    this.addWall = function (iWidth, iHeight, iX, iY, iAngle, density, friction, restitution) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;

        var bodyDef = new s_oBox2D.b2BodyDef();
        //create ground
        bodyDef.type = s_oBox2D.b2_staticBody;
        fixDef.shape = new s_oBox2D.b2PolygonShape;
        fixDef.shape.SetAsBox(iWidth / WORLD_SCALE, iHeight / WORLD_SCALE);
        bodyDef.position.Set(iX / WORLD_SCALE, iY / WORLD_SCALE);
        bodyDef.angle = iAngle * Math.PI / 180;
        _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);
    };

    this.addLine = function (iX, iY, oStartPoint, oEndPoint, iAngle, density, friction, restitution, iType) {
        // Create some objects in the world
        var fixDef = new s_oBox2D.b2FixtureDef();
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;
        fixDef.filter.categoryBits = FIELD_CATEGORY_COLLISION;
        fixDef.filter.maskBits = -1;
        fixDef.filter.groupIndex = 1;

        var bodyDef = new s_oBox2D.b2BodyDef();
        //create ground

        bodyDef.type = s_oBox2D.b2_staticBody;
        bodyDef.position.Set(iX / WORLD_SCALE, iY / WORLD_SCALE);
        bodyDef.angle = iAngle * Math.PI / 180;

        var points = [];

        var vecStart = new s_oBox2D.b2Vec2();
        vecStart.Set(oStartPoint.x / WORLD_SCALE, oStartPoint.y / WORLD_SCALE);
        points.push(vecStart);

        var vecEnd = new s_oBox2D.b2Vec2();
        vecEnd.Set(oEndPoint.x / WORLD_SCALE, oEndPoint.y / WORLD_SCALE);
        points.push(vecEnd);
        
        var oShape =  new s_oBox2D.b2EdgeShape;

        oShape.Set(vecStart,vecEnd);
        
        fixDef.shape = oShape;
        
        var oBody = _oWorld.CreateBody(bodyDef);
        oBody.whateverYouWant = {type: iType};
        
        var lineFixture = oBody.CreateFixture(fixDef);

        return lineFixture;
    };

    this.addPolygon = function (oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.isSensor = oObject.sensor;
        fixDef.filter.categoryBits = 0x0003;
        fixDef.filter.maskBits = 0x0001;
        fixDef.filter.groupIndex = 1;

        var bodyDef = new s_oBox2D.b2BodyDef();
        //create ground

        bodyDef.type = s_oBox2D.b2_staticBody;
        bodyDef.position.Set(oObject.x / WORLD_SCALE, oObject.y / WORLD_SCALE);
        bodyDef.angle = oObject.angle * Math.PI / 180;
        fixDef.shape = new s_oBox2D.b2PolygonShape;

        var aVertex = oObject.vertex;

        var points = [];
        for (var i = 0; i < aVertex.length; i++) {
            var vecStart = new b2Vec2();
            vecStart.Set(aVertex[i].x / WORLD_SCALE, aVertex[i].y / WORLD_SCALE);
            points.push(vecStart);
        }

        fixDef.shape.SetAsArray(points, points.length);
        
        var oBody = _oWorld.CreateBody(bodyDef);
        oBody.whateverYouWant = oObject.info;
        
        var polygonfixture = oBody.CreateFixture(fixDef);

        return polygonfixture;

    };

    this.addCollisionPolygon = function (oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        if (oObject.info.type === PLAYER) {
            fixDef.filter.categoryBits = FIELD_CATEGORY_COLLISION;
            fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
            fixDef.filter.groupIndex = 1;
        } else if (oObject.info.type === OPPONENT) {
            fixDef.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
            fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
            fixDef.filter.groupIndex = 1;
        }

        var bodyDef = new s_oBox2D.b2BodyDef();
        //create ground

        bodyDef.type = s_oBox2D.b2_kinematicBody;
        bodyDef.position.Set(oObject.x / WORLD_SCALE, oObject.y / WORLD_SCALE);
        bodyDef.angle = oObject.angle * Math.PI / 180;

        fixDef.shape = new s_oBox2D.b2PolygonShape;

        var aVertex = oObject.vertex;

        var aPlayerCollision = new Array();

        for (var i = 0; i < aVertex.length; i++) {
            var points = [];
            for (var j = 0; j < aVertex[i].length; j++) {
                var vecStart = new b2Vec2();
                if (oObject.info.type === OPPONENT)
                    vecStart.Set(aVertex[i][j].x / WORLD_SCALE, (aVertex[i][j].y + 11) / WORLD_SCALE);
                else
                    vecStart.Set(aVertex[i][j].x / WORLD_SCALE, aVertex[i][j].y / WORLD_SCALE);
                points.push(vecStart);
            }
            fixDef.shape.SetAsArray(points, points.length);
            
            var oBody = _oWorld.CreateBody(bodyDef);
            oBody.whateverYouWant = oObject.info;
            
            aPlayerCollision[i] = oBody.CreateFixture(fixDef);
        }

        return aPlayerCollision;
    };

    this.addCollisionShape = function (oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;

        fixDef.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
        fixDef.filter.maskBits = BALL_CATEGORY_COLLISION;
        fixDef.filter.groupIndex = 1;

        var bodyDef = new s_oBox2D.b2BodyDef();
        //create rectangular body
        bodyDef.type = s_oBox2D.b2_dynamicBody;
        fixDef.shape = new s_oBox2D.b2PolygonShape;
        fixDef.shape.SetAsBox(oObject.recWidth / WORLD_SCALE, oObject.recHeight / WORLD_SCALE);
        bodyDef.position.Set((oObject.x + oObject.rec_offset.x) / WORLD_SCALE,
                (oObject.y + oObject.rec_offset.y) / WORLD_SCALE);
        bodyDef.fixedRotation = true;

        var Body1 = _oWorld.CreateBody(bodyDef);
        var boxFixture = Body1.CreateFixture(fixDef);

        var bodyDef = new s_oBox2D.b2BodyDef();

        var SpherefixDef = new b2FixtureDef;
        SpherefixDef.density = oObject.density;
        SpherefixDef.friction = oObject.friction;
        SpherefixDef.restitution = oObject.restitution;

        SpherefixDef.filter.categoryBits = OPPONENT_CATEGORY_COLLISION;
        SpherefixDef.filter.maskBits = -1;
        SpherefixDef.filter.groupIndex = 1;

        bodyDef.type = s_oBox2D.b2_dynamicBody;
        SpherefixDef.shape = new s_oBox2D.b2CircleShape(oObject.radius / WORLD_SCALE);
        bodyDef.position.x = (oObject.x + oObject.sph_offset.x) / WORLD_SCALE;
        bodyDef.position.y = (oObject.y + oObject.sph_offset.y) / WORLD_SCALE;
        bodyDef.fixedRotation = true;
        bodyDef.allowSleep = false;
        bodyDef.bullet = true;
        var Body2 = _oWorld.CreateBody(bodyDef);
        var headFixture = Body2.CreateFixture(SpherefixDef);

        var bodyDef = new s_oBox2D.b2BodyDef();
        //create rectangular neck
        bodyDef.type = s_oBox2D.b2_dynamicBody;
        fixDef.shape = new s_oBox2D.b2PolygonShape;
        fixDef.shape.SetAsBox(oObject.rec_neck.width / WORLD_SCALE, oObject.rec_neck.height / WORLD_SCALE);
        bodyDef.position.Set((oObject.x + oObject.rec_neck.x) / WORLD_SCALE,
                (oObject.y + oObject.rec_neck.y) / WORLD_SCALE);
        bodyDef.angle = oObject.rec_neck.angle * (Math.PI / 180);
        bodyDef.fixedRotation = true;

        var Body3 = _oWorld.CreateBody(bodyDef);
        var neckFixture = Body3.CreateFixture(fixDef);

        var jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(Body1, Body2, Body2.GetWorldCenter());
        var jointBody = _oWorld.CreateJoint(jointDef);

        var jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(Body1, Body3, Body3.GetWorldCenter());
        var jointNeck = _oWorld.CreateJoint(jointDef);

        return {fixture1: boxFixture, fixture2: headFixture, fixture3: neckFixture, jointA: jointBody, jointB: jointNeck};
    };

    this.createAContactListener = function () {
        var listener = new s_oBox2D.JSContactListener();
        listener.BeginContact = function (contactPtr) {
            var contact = s_oBox2D.wrapPointer( contactPtr, s_oBox2D.b2Contact );
            
            var oInfo = contact.GetFixtureA().GetBody().whateverYouWant;
            var oInfo1 = contact.GetFixtureB().GetBody().whateverYouWant;

            
            if (oInfo === null || oInfo1 === null) {
                return;
            }

            if (oInfo.type === HEROES && oInfo1.type === BONUS_HEART) {
                s_oGame.bonusHeart();
                s_oGame.bonusDisapper(oInfo1.id);
                s_oGame.addScore(BONUS_SCORE[oInfo1.id]);
            } else if (oInfo.type === FLOOR && oInfo1.type === BONUS_HEART) {
                s_oGame.bonusDisapper(oInfo1.id);
            } else {
                for (var i = 0; i < ITEM.length; i++)
                    if (oInfo.type === HEROES && oInfo1.type === ITEM[i]) {
                        var v2ColPoint = new s_oBox2D.b2Vec2();
                        var manifold = new s_oBox2D.b2WorldManifold();
                        contact.GetWorldManifold(manifold);

                        
                        v2ColPoint.Set(manifold.points.x, manifold.points.y);

                        var oPointLocal = contact.GetFixtureA().GetBody().GetLocalPoint(v2ColPoint);

                        s_oGame.heroesTouchItem(contact.GetFixtureB(), oPointLocal, oInfo1.id);

                        break;

                    } else if (oInfo.type === FLOOR && oInfo1.type === ITEM[i]) {
                        s_oGame.itemOnFloor(oInfo1.id);
                        break;
                    } else if (oInfo.type === TARGET && oInfo1.type === ITEM[i]) {
                        s_oGame.itemInTarget(oInfo1.id);

                        break;
                    }  
            }
        };
        
        listener.EndContact = function() {};
        listener.PreSolve = function() {};
        listener.PostSolve = function() {};
        
        _oWorld.SetContactListener(listener);
    };

    this.addPolygon = function (oObject) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.isSensor = oObject.sensor;

        var bodyDef = new s_oBox2D.b2BodyDef();
        //create ground

        bodyDef.type = s_oBox2D.b2_staticBody;
        bodyDef.position.Set((oObject.x) / WORLD_SCALE, (oObject.y) / WORLD_SCALE);
        bodyDef.angle = oObject.angle * Math.PI / 180;
       
        fixDef.shape = new s_oBox2D.b2PolygonShape;

        var aVertex = oObject.vertex;

        var points = [];
        for (var i = 0; i < aVertex.length; i++) {
            var vecStart = new b2Vec2();
            vecStart.Set(aVertex[i].x / WORLD_SCALE, aVertex[i].y / WORLD_SCALE);
            points.push(vecStart);
        }
        
        fixDef.shape.SetAsArray(points, points.length);
        
        var oBody = _oWorld.CreateBody(bodyDef);
        oBody.whateverYouWant = oObject.info;
        
        var polygonfixture = oBody.CreateFixture(fixDef);

        return polygonfixture;
    };

    this.addCircle = function (oObject, iID) {
        // Create some objects in the world
        var fixDef = new s_oBox2D.b2FixtureDef();
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.filter.categoryBits = oObject.catBits;
        fixDef.filter.maskBits = oObject.maskBits;
        fixDef.filter.groupIndex = oObject.groupId;

        var bodyDef = new s_oBox2D.b2BodyDef();

        var oInfo = {type: oObject.info.type, id: iID};
            
        //create some objects
        var oShape =  new s_oBox2D.b2CircleShape();
        oShape.set_m_radius(oObject.width / WORLD_SCALE);
        
        bodyDef.type = s_oBox2D.b2_dynamicBody;
        fixDef.shape = oShape;        //radius
        bodyDef.position.x = oObject.x / WORLD_SCALE;
        bodyDef.position.y = oObject.y / WORLD_SCALE;
       
        bodyDef.linearDamping = oObject.linearDamping;
        bodyDef.angularDamping = oObject.angularDamping;
        bodyDef.bullet = true;
        bodyDef.fixedRotation = false;
        
        var oBody = _oWorld.CreateBody(bodyDef);
        oBody.whateverYouWant = oInfo;
        var crateFixture = oBody.CreateFixture(fixDef);

        return crateFixture;
    };

    this.addStaticCircle = function (iWidth, iX, iY, density, friction, restitution) {
        // Create some objects in the world
        var fixDef = new b2FixtureDef;
        fixDef.density = density;
        fixDef.friction = friction;
        fixDef.restitution = restitution;

        var bodyDef = new s_oBox2D.b2BodyDef();

        //create some objects
        bodyDef.type = s_oBox2D.b2_staticBody;
        fixDef.shape = new s_oBox2D.b2CircleShape(iWidth / WORLD_SCALE);         //radius
        bodyDef.position.x = iX / WORLD_SCALE;
        bodyDef.position.y = iY / WORLD_SCALE;
        var crateFixture = _oWorld.CreateBody(bodyDef).CreateFixture(fixDef);
        return crateFixture;
    };

    this.addRectangle = function (oObject) {
        // Create some objects in the world
        var fixDef = new s_oBox2D.b2FixtureDef();
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.isSensor = oObject.sensor;
        fixDef.filter.categoryBits = oObject.catBits;
        fixDef.filter.maskBits = oObject.maskBits;
        fixDef.filter.groupIndex = oObject.groupId;

        var bodyDef = new s_oBox2D.b2BodyDef();
        //create ground
        bodyDef.type = s_oBox2D.b2_staticBody;
        var oShape = new s_oBox2D.b2PolygonShape();
        oShape.SetAsBox(oObject.width / WORLD_SCALE, oObject.height / WORLD_SCALE);
        fixDef.shape = oShape;

        bodyDef.position.Set(oObject.x / WORLD_SCALE, oObject.y / WORLD_SCALE);
        bodyDef.angle = oObject.angle * Math.PI / 180;
        var oBody = _oWorld.CreateBody(bodyDef);
        oBody.whateverYouWant = oObject.info;
        var crateFixture = oBody.CreateFixture(fixDef);

        return crateFixture;
    };

    this.addObstacle = function (iX, iY, iAngle, oObject) {
        // Create some objects in the world
        var fixDef = new s_oBox2D.b2FixtureDef();
        fixDef.density = oObject.density;
        fixDef.friction = oObject.friction;
        fixDef.restitution = oObject.restitution;
        fixDef.isSensor = oObject.sensor;
        fixDef.filter.categoryBits = oObject.catBits;
        fixDef.filter.maskBits = oObject.maskBits;
        fixDef.filter.groupIndex = oObject.groupId;
        
        var bodyDef = new s_oBox2D.b2BodyDef();
       
        bodyDef.type = s_oBox2D.b2_staticBody;
        var oShape = new s_oBox2D.b2PolygonShape();
        oShape.SetAsBox(oObject.width / WORLD_SCALE, oObject.height / WORLD_SCALE);
        fixDef.shape = oShape;

        bodyDef.position.Set(iX / WORLD_SCALE, iY / WORLD_SCALE);
        bodyDef.angle = iAngle * Math.PI / 180;
        var oBody = _oWorld.CreateBody(bodyDef);
        oBody.whateverYouWant = oObject.info;
        var crateFixture = oBody.CreateFixture(fixDef);

        return crateFixture;
    };

    this.setRotation = function (iRot) {
        this.rotation = iRot;
    };

    this._update = function (evt) {

    };

    this.init();

}