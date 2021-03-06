/* 
 This file was generated by Dashcode.  
 You may edit this file to customize your widget or web page 
 according to the license.txt file included in the project.
 */

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    dashcode.setupParts();
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}

function select_all(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}

function shorten_click(event)
{


    url = "http://pelletier.im/bitlyfront/submit/?url=";
    
    var long_url = document.getElementById("urlfield").value;
    url = url + long_url;

    xmlRequest = new XMLHttpRequest();
    xmlRequest.setRequestHeader("Cache-Control", "no-cache");
    xmlRequest.onreadystatechange = processRequestChange;
    xmlRequest.open("GET",url,true);
    xmlRequest.send(null);
}

function processRequestChange() {   
    if (null == xmlRequest.readyState) return;
    if (xmlRequest.readyState == 4) {
        if (xmlRequest.status == 200) {
            document.getElementById("urlfield").value = xmlRequest.responseText;
            select_all("urlfield");

        }
        else {
            if (xmlRequest.status == null) return;
            document.getElementById("urlfield").value = "No correct response";
            select_all("urlfield");
        }
    }
}


function return_handler(event)
{
    if(event.keyCode == 13) {
        shorten_click(event);
    }
}

function pass_focus(event)
{
    document.getElementById("urlfield").focus();
}
