 /**
  * Status v1.0.3
  * Status is a light-weight pop-up status message utility.
  *
  * Copyright (c) 2009-2010 GreatGhoul
  * G2W All Right Reserved.
  * http://greatghoul.blogspot.com
  * http://greatghoul.cnblogs.com
  *
  * Date: 2010/02/17 16:58
  * Revision: 13
  * 
  * Note:
  *  | To take effect, please deploy Status's script file 
  *  | before all of other scripts in the <head> tag.
  *  
  * Usage:
  *  | Show a message then hide it after the specified duration. 
  *  |   Status.show('hey, there!', 3000);
  *  |
  *  | Show a message then hide it after the default duration(5000ms).
  *  |   Status.show('hey, there!');
  *  |   
  *  | Hide the message immediately.
  *  |   Status.hide();
  *  | 
  *  | Enable/Disable auto-hide.
  *  |   Status.enableAutohide(true);  // Enable auto-hide.
  *  |   Status.enableAutohide(false); // Disable auto-hide.
  *  |
  *  | Configure the auto-hide duration to a new value.
  *  |   Status.setTimeout(1000);  // Now the duration will be 1000ms.
  */

(function() {
    // Map over Status.
    var Status = window.Status = {};
    // Setup the timeout in ms to fade the status. 
    var timeout = 5000;
    // Is the document fully loaded.
    var isReady = false;
    // Will refer to the element that used to show status..
    var entity;
    // A timer to count up the timeout.
    var timer;
    // The status won't hide automatically.
    var autohide = true;
    // Will hode something that left in the status bar,
    // so after the document is fully loaded, 
    // Status will know if it's necessary to clean the status bar.
    var status;

    // Create a unique entity in the html document.
    function createEntity() {
        entity = document.createElement('span');
        entity.setAttribute('id', 'g2w-status-entity');
        with (entity.style) {
            background = '#4D1600';
            color = '#C6A198';
            fontWeight = 'bold';
            padding = '2px 5px';
            display = 'none';
            position = 'absolute';
            left = '0px';
            bottom = '0px';
        }
        document.body.appendChild(entity);
        isReady = true;
    }

    // Bind the onload callback to create the html entity.
    function bindReady() {
        // If IE event model is used.
        if (document.attachEvent) {
            document.attachEvent("onreadystatechange", function(){
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", arguments.callee);
                    createEntity();
                }
            });
        // If Non IE event model is used.
        } else if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function(){
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                createEntity();
            }, false);
        }
    }

    // Set the timeout in ms to fade the status.
    Status.setTimeout = function(t) {
        timeout = isNaN(t) ? 5000 : t;
    };
    
    // Set weather to auto hide the status or not.
    Status.enableAutohide = function(auto) {
        autohide = auto ? true : false;
    };

    // Show a status message.
    Status.show = function(msg, t) {
        // Use the entity to show the message.
        if (isReady) {
            if (!entity) createEntity();
            // Make sure the status bar is clean.
            if (status) {
                window.status = '';
                status = null;
            }
            entity.innerHTML = msg;
            entity.style.display = 'block';
        // Use the status bar to show the message.
        } else {
            window.status = status = msg;
        }
        
        // Autohide or not
        if (t || autohide) {  
            timer = setTimeout(Status.hide, t || timeout);
        }
    };
    
    // Hide the status.
    Status.hide = function() {
        clearTimeout(timer);
        if (isReady) {
            if (!entity) createEntity();
            entity.innerHTML = '';
            entity.style.display = 'none';
        } else {
            window.status = '';
        }
    };
    
    /* Initializtion */ {
        bindReady();
    }
})();