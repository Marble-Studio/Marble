function CPhysicsController() {
    
    var _oGravity;
    var _oWorld;
    var _oPhysicController = this;

    var _oDebugCtx;
    this.init = function () {
            _oGravity = new s_oBox2D.b2Vec2(0, 9.81);
            _oWorld = new s_oBox2D.b2World(_oGravity);

            if(DEBUG_BOX2D){
                var canv = document.createElement('canvas');
                canv.id = 'debug';
                canv.width = s_oCanvas.width;
                canv.height = s_oCanvas.height;
                canv.style.position = "fixed";
                document.body.appendChild(canv); // adds the canvas to the body element

                $( "#debug" ).css( 'pointer-events', 'none' );

                var canvas = document.getElementById("debug");
                _oDebugCtx = canvas.getContext("2d");

                //setup debug draw
                var oDebugDraw = getCanvasDebugDraw(_oDebugCtx);

                _oWorld.SetDebugDraw(oDebugDraw);

                sizeHandler();
            }
    };
    
    this.startComputing = function (oElement) {
        oElement.GetBody().SetActive(true);
    };

    this.applyImpulse = function (oElement, oDir) {
        oElement.GetBody().ApplyLinearImpulse(oDir, oElement.GetBody().GetWorldCenter());
    };

    this.applyForce = function (oElement, oDir) {
        oElement.GetBody().ApplyForce(oDir, oElement.GetBody().GetWorldCenter());
    };

    this.decreaseSpeedRotation = function (oElement) {
        var iNewAngularVelocity = oElement.GetBody().GetAngularVelocity() * 0.99;
        oElement.GetBody().SetAngularVelocity(iNewAngularVelocity);
    };

    this.activeBody = function (oElement, bVal) {
        oElement.GetBody().SetActive(bVal);
        oElement.GetBody().SetAwake(bVal);
    };

    this.destroyAllBody = function () {
        var b2Bodies = _oWorld.GetBodyList();
        while (_oWorld.GetBodyCount() !== 0) {
            var b2Body = b2Bodies.GetNext();
            _oWorld.DestroyBody(b2Body);
        }
    };

    this.destroyAllJoint = function () {
        var b2Joints = _oWorld.GetJointList();
        while (b2Joints.GetNext()) {
            var b2Joint = b2Joints.GetNext();
            _oWorld.DestroyJoint(b2Joint);
        }
    };

    this.destroyWorld = function () {
        _oWorld = null;
    };

    this.getSpeedRotation = function (oElement) {
        return oElement.GetBody().GetAngularVelocity();
    };

    this.moveObject = function (oElement, iX, iY) {
        var oPos = {x: iX / WORLD_SCALE, y: iY / WORLD_SCALE};
        oElement.GetBody().SetTransform(oPos, 0);
    };

    this.moveObjectX = function (oElement, iX) {
        var oPos = {x: iX / WORLD_SCALE, y: oElement.GetBody.GetPosition().y};
        oElement.GetBody().SetPosition(oPos);
    };

    this.destroyBody = function (oElement) {
        _oWorld.DestroyBody(oElement.GetBody());
    };

    this.destroyJoint = function (oElement) {
        _oWorld.DestroyJoint(oElement);
    };

    this.getJointAngle = function (oElement) {
        return oElement.GetJointAngle() * (180 / Math.PI);
    };

    this.getInstance = function () {
        if (_oPhysicController === null) {
            _oPhysicController = new CPhysicsController();
        }
        return _oPhysicController;
    };

    this.getJointTranslation = function (oElement) {
        return oElement.GetJointTranslation();
    };

    this.update = function () {
        // Update the box2d world
        _oWorld.Step(TIME_STEP_BOX2D, ITINERATION_BOX2D, POSITION_ITINERATION_BOX2D);
        _oWorld.ClearForces();
        
        if(DEBUG_BOX2D){
            
            _oDebugCtx.save(); 
            _oDebugCtx.clearRect(0, 0, s_oCanvas.width, s_oCanvas.height);
            _oDebugCtx.translate(0, 0);

            _oDebugCtx.scale(1,1);
            _oWorld.DrawDebugData();
            
            _oDebugCtx.restore();
        }
    };

    this.upadteDrawDebug = function () {
        _oWorld.DrawDebugData();
    };

    this.getWorld = function () {
        return _oWorld;
    };

    this.setElementLinearDamping = function (oElement, oVel) {
        oElement.GetBody().SetLinearDamping(oVel);
    };
    
    
    this.setElementAngularVelocity = function (oElement, iVal) {
        oElement.GetBody().SetAngularVelocity(iVal);
    };
    
    this.setElementPosition = function (oElement, oPosLocal) {
        var oPosWorld = new s_oBox2D.b2Vec2(oPosLocal.x / WORLD_SCALE, oPosLocal.y / WORLD_SCALE);

        oElement.GetBody().SetTransform(oPosWorld, oElement.GetBody().GetAngle());
    };

    this.getElementPosition = function (oElement) {
        var oPos = oElement.GetBody().GetPosition();
        return {x: oPos.x * WORLD_SCALE, y: oPos.y * WORLD_SCALE, angle: oElement.GetBody().GetAngle() * 180 / Math.PI};
    };

    this.setElementAngle = function (oElement, iAngle) {
        var oPosBody = oElement.GetBody().GetPosition();
        oElement.GetBody().SetTransform(oPosBody, iAngle * Math.PI / 180);
    };

    this.getElementAngle = function (oElement) {
        return oElement.GetBody().GetAngle() * 180 / Math.PI;
    };

    this.getElementVelocity = function (oElement) {
        return oElement.GetBody().GetLinearVelocity();
    };

    this.setElementLinearVelocity = function (oElement, fValue) {
        return oElement.GetBody().SetLinearVelocity(fValue);
    };
    this.init();

}