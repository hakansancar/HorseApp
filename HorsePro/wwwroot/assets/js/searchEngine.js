
    function newHttpReq()
    {
        var newRequest = null;

        try
        {
            newRequest = new XMLHttpRequest();
        }
        catch(trymicrosoft)
        {
            try
            {
                newRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(othermicrosoft)
            {
                try
                {
                    newRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(failed)
                {
                    newRequest = null;
                }
            }
        }

        return newRequest;

    }

    var image001 = new Image();
    image001.src = '/assets/images/Searching.gif';

    var flagcolorselected = false;
    var closeTimerSearchTypeOptionsSearchEngine = 0;

    var request = newHttpReq();
    var httpobject = [];
    httpobject[-1] = newHttpReq();

    var backgroundobject;
    var sourceobject;
    var targetobject;
    var requestcount = 0;

    if(!httpobject[-1])
    {
        alert("Error Initializing XMLHttpRequest!");
    }

    function bringtotop(artworkid,tag,status)
    {

        var url = '/queries/updateartworktags.php?artworkid=' + artworkid + '&tag=' + tag + '&status='+status;
        if((request.readyState != 4) && (request.readyState != 0))
        {
            request.abort();
            request = newHttpReq();
        }

        request.open('GET',url,true);
        request.onreadystatechange = updatebringtotop;
        request.send(null);

        return;

    }

    function skip(artworkid)
    {

        var sourcediv = document.getElementById('artworkdiv[' + artworkid + ']');
        sourcediv.parentNode.removeChild(sourcediv);

    }


    function updatebringtotop()
    {

        try
        {
            if(request.readyState == 4)
            {
            }

            if(request.status == 200)
            {
            }
        }
        catch (e)
        {
            return;
        }


        if (request.readyState == 4)
        {
            if(request.status == 200)
            {
                //alert(request.responseText);
                var artworkid = request.responseText;

                var sourcediv = document.getElementById('artworkdiv[' + artworkid + ']');
                //sourcediv.parentNode.removeChild(sourcediv);

                sourcediv.innerHTML = '';

            }
        }
    }


    function promotemember(artworkid,status)
    {

        var url = '/queries/promotemember.php?artworkid=' + artworkid + '&status='+status;

        if((request.readyState != 4) && (request.readyState != 0))
        {
            request.abort();
            request = newHttpReq();
        }

        request.open('GET',url,true);
        request.onreadystatechange = updatepage;
        request.send(null);

        return;

    }


    function promoteartwork(artworkid,status)
    {

        var url = '/queries/promoteartwork.php?artworkid=' + artworkid + '&status='+status;

        if((request.readyState != 4) && (request.readyState != 0))
        {
            request.abort();
            request = newHttpReq();
        }

        request.open('GET',url,true);
        request.onreadystatechange = updatepage;
        request.send(null);

        return;

    }


    function updatepage()
    {

        try
        {
            if(request.readyState == 4)
            {
            }

            if(request.status == 200)
            {
            }
        }
        catch (e)
        {
            return;
        }


        if (request.readyState == 4)
        {
            if(request.status == 200)
            {

                alert(request.responseText);

            }
        }
    }

    function showpromotion(action)
    {
        if(document.getElementById('dimdiv'))
        {
            var widthclient = parseInt(document.documentElement.clientWidth);
            var heightclient = parseInt(document.documentElement.clientHeight);

            backgroundobject = document.getElementById('dimdiv');
            backgroundobject.style.width = '100%';
            backgroundobject.style.height = document.body.scrollHeight + 0 + 'px';
            backgroundobject.style.visibility = 'visible';

            targetobject = document.getElementById('lookupdiv');

            var targetObjectWidth = widthclient - 52;

            if(targetObjectWidth > 700)
            {
                targetObjectWidth = 700;
            }

            targetobject.style.width = targetObjectWidth + 'px';

            var sourceposx, sourceposy;
            sourceobject = document.getElementById('promotiondiv');

            if (sourceobject.offsetParent)
            {
                sourceposy = sourceobject.offsetTop;

                while (sourceobject = sourceobject.offsetParent)
                {
                    sourceposy += sourceobject.offsetTop;
                }
            }

            // Add 50 because loopupdiv has padding set to 25.
            sourceposx = ((widthclient - targetObjectWidth - 52) / 2);
            sourceposy -= 1;

            //alert(widthclient + ' - ' + targetObjectWidth + ' - ' + sourceposx);

            targetobject.style.pixelLeft = sourceposx;
            targetobject.style.pixelTop = sourceposy;
            targetobject.style.left = sourceposx + 'px';
            targetobject.style.top = sourceposy + 'px';

            var localvalue = requestcount;
            var poststring = "action=" + action + "&pagename=" + thispage + "&pagetitle=" + searchEngineSponsorshipTitle;

            if(action == 'submit')
            {
                var sourcepagename = document.getElementById('sourcepagename').value;
                sourcepagename = sourcepagename.replace(/&/g,'--ampersand--');

                poststring = poststring + "&sourcepagename=" + sourcepagename;

                document.getElementById('lookupdiv').scrollIntoView(true);

            }

            targetobject.innerHTML = "<p style='float: left; font: 10pt arial; padding-top: 3px; padding-right: 5px;'>Please Wait</p><img style='float: left;' src='/assets/images/Searching.gif'>";
            targetobject.style.visibility = "visible";

            httpobject[localvalue] = newHttpReq();
            httpobject[localvalue].onreadystatechange = function(){

                try
                {
                    if(httpobject[localvalue].readyState == 4)
                    {
                    }

                    if(httpobject[localvalue].status == 200)
                    {
                    }
                }
                catch (e)
                {
                    return;
                }

                if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
                {
                    //document.getElementById('lookupdiv2').innerHTML = httpobject[localvalue].responseText;

                    var response = httpobject[localvalue].responseText.split("EXTRAINSTRUCTIONS");

                    document.getElementById('lookupdiv').innerHTML = response[0];

                    if(response[1])
                    {
                        eval(response[1]);
                    }


                }


            };

            var url = '/queries/querysearchpagepromotion.php';

            httpobject[localvalue].open('POST',url,true);
            httpobject[localvalue].setRequestHeader("content-type", "application/x-www-form-urlencoded");
            httpobject[localvalue].send(poststring);

            requestcount += 1;

        }
    }


    function closelookupwindow()
    {
        if(document.getElementById('lookupdiv'))
        {
            document.getElementById('lookupdiv').style.visibility = 'hidden';
        }

        if(document.getElementById('dimdiv'))
        {
            document.getElementById('dimdiv').style.visibility = 'hidden';
        }
    }

    function changeproductfilter()
    {
        window.location = document.getElementById('productfilter').value;
    }

    function changemediumfilter()
    {
        window.location = document.getElementById('mediumfilter').value;
    }

    function changecollectionid()
    {
        window.location = document.getElementById('collectionid').value;
    }

    function expandallsubjectsdiv()
    {
        document.getElementById('allsubjectsdiv').style.height = 'auto';
        document.getElementById('expanddiv').innerHTML = '&nbsp;';
    }

    function expandallcollectionsdiv()
    {
        document.getElementById('allcollectionsdiv').style.height = '';
        document.getElementById('expandcollectionsdiv').innerHTML = '&nbsp;';
    }

    var flagemailcleared = 0;

    function clearemail()
    {
        if(flagemailcleared == 0)
        {
            document.getElementById('promotionemail').value = '';
            flagemailcleared = 1;
        }
    }


    function searchEngineSidebarSubmitEmailSubscription()
    {
        createGlobalForegroundAndBackgroundDiv();
        showGlobalForegroundAndBackgroundDiv();

        var localvalue = requestcount;
        var email = document.getElementById('searchEngineSidebarEmail').value;


        if(email == '' || email == 'E-Mail Address')
        {
            alert('You must enter an e-mail address.');
            return;
        }

        document.getElementById('searchEngineSidebarEmail').value = '';

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('globalForegroundDiv').innerHTML = response[0];

                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);

                    if(responseData.hasOwnProperty('visitorData'))
                    {
                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                            'event': 'gtm.subscribe',
                            'eventLabel': 'search-sidebar',
                            'visitorEmail': email
                        });
                    }
                }
            }
        };

        var url = '/queries/queryGlobalEmailSubscriptionPopUp.php';
        var postString = 'action=submit&email=' + email + '&sourcePage=' + window.location.pathname;

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }


    function searchEngineSidebarEmailCheckForEnter(e)
    {
        if(e.keyCode === 13)
        {
            searchEngineSidebarSubmitEmailSubscription();
        }
    }

    function storescreenwidth()
    {
        var localvalue = requestcount;
        var poststring = "screenwidth=" + screen.width;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                //alert(httpobject[localvalue].responseText);
            }


        };

        var url = '/queries/querystorescreenwidth.php';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type','application/x-www-form-urlencoded');
        httpobject[localvalue].send(poststring);

        requestcount += 1;

    }

    var flagbottomvisible = false;
    var flagtransitioninprogress = false;
    var targetheight = 0;

    //window.onscroll = capturescrollposition;

    function capturescrollposition()
    {
        var widthclient = parseInt(document.documentElement.clientWidth);
        var heightclient = parseInt(document.documentElement.clientHeight);

        var scrolly = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;

        if(scrolly == 0)
        {
            scrolly = document.body.scrollTop;
        }

        var timestamp = new Date().getTime();

        //document.getElementById('bottomtext').innerHTML = widthclient + ' - ' + heightclient + ' - ' + scrolly + ' - ' + timestamp;

        if(document.getElementById('specialpromotiondiv'))
        {
            if(scrolly < 2000)
            {
                if(flagbottomvisible == true && flagtransitioninprogress != true)
                {
                    hidebottom();
                }

            }
            else
            {
                if(flagbottomvisible == false && flagtransitioninprogress != true)
                {
                    showbottom();
                }
            }
        }
    }

    function showbottom()
    {
        flagtransitioninprogress = true;

        targetheight = 0;

        document.getElementById('specialpromotiondiv').style.height = targetheight + 'px';
        document.getElementById('specialpromotiondiv').style.visibility = 'visible';

        showinprogress();
    }

    function showinprogress()
    {
        targetheight += 1;
        document.getElementById('specialpromotiondiv').style.height = targetheight + 'px';

        if (targetheight < 50)
        {
            t = setTimeout("showinprogress()", 10);
        }
        else
        {
            flagtransitioninprogress = false;
            flagbottomvisible = true;
        }
    }


    function hidebottom()
    {
        flagtransitioninprogress = true;
        targetheight = parseInt(document.getElementById('specialpromotiondiv').style.height);

        hideinprogress();
    }

    function hideinprogress()
    {
        targetheight -= 1;
        document.getElementById('specialpromotiondiv').style.height = targetheight + 'px';

        if (targetheight > 0)
        {
            t = setTimeout("hideinprogress()", 10);
        }
        else
        {
            document.getElementById('specialpromotiondiv').style.visibility = 'hidden';
            flagtransitioninprogress = false;
            flagbottomvisible = false;
        }
    }

    function showemailform()
    {

        if(!document.getElementById('foregrounddiv') || !document.getElementById('backgrounddiv'))
        {
            var newdiv;
            var cssstyle;

            // Background Div
            if(!document.getElementById('backgrounddiv'))
            {
                newdiv = document.createElement('div');
                cssstyle = 'position: fixed; z-index: 5000; left: 0px; top: 0px; width: 10px; height: 10px; background-color: #000000; visibility: hidden; opacity: 0.50; filter: alpha(opacity=50);';
                newdiv.id = 'backgrounddiv';
                newdiv.setAttribute('style',cssstyle);
                newdiv.style.cssText = cssstyle;
                document.body.appendChild(newdiv);
            }

            // Foreground Div
            if(!document.getElementById('foregrounddiv'))
            {
                newdiv = document.createElement('div');
                cssstyle = 'position: fixed; z-index: 5001; left: 0px; top: 0px; width: 700px; min-height: 50px; padding: 0px; overflow: auto; border: 15px solid #666666; background-color: #FFFFFF; visibility: hidden; box-shadow: 0px 0px 50px #000000;';
                newdiv.id = 'foregrounddiv';
                newdiv.setAttribute('style',cssstyle);
                newdiv.style.cssText = cssstyle;
                document.body.appendChild(newdiv);
            }
        }

        var backgroundobject = document.getElementById('backgrounddiv');
        backgroundobject.style.width = '100%';
        backgroundobject.style.height = '100%';
        backgroundobject.style.visibility = 'visible';

        var widthclient = parseInt(document.documentElement.clientWidth);
        var heightclient = parseInt(document.documentElement.clientHeight);

        var widthtarget = parseInt(widthclient*0.80);
        var heighttarget = parseInt(heightclient*0.60);

        if((widthtarget + 30) > widthclient)
        {
            widthtarget = widthclient - 30;
        }

        if((heighttarget + 30) > heightclient)
        {
            heighttarget = heightclient - 30;
        }

        if(widthtarget > 800)
        {
            widthtarget = 800;
        }

        if(heighttarget > 600)
        {
            heighttarget = 600;
        }

        //var widthtarget = 800;
        //var heighttarget = 300;

        var offsetleft = 0;
        var offsettop = 0;

        var offsetx = 0;
        var offsety = 0;

        if(document.documentElement.scrollTop && !document.body.scrollTop)
        {
            //offsetleft = document.documentElement.scrollLeft;
            //offsettop = document.documentElement.scrollTop;
        }
        else
        {
            //offsetleft = document.body.scrollLeft;
            //offsettop = document.body.scrollTop;
        }

        var logindiv = document.getElementById('foregrounddiv');
        logindiv.style.width = widthtarget + 'px';
        logindiv.style.height = heighttarget + 'px';
        logindiv.style.visibility = 'visible';
        logindiv.innerHTML = "<img src='/assets/images/Searching.gif' style='float: left;'>";

        logindiv.style.left = (offsetx + offsetleft + parseInt((widthclient - (widthtarget + 30)) / 2)) + 'px';
        logindiv.style.top = (offsety + offsettop + parseInt((heightclient - (heighttarget + 30)) / 2)) + 'px';

        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById('foregrounddiv').innerHTML = httpobject[localvalue].responseText;
            }


        };

        var url = '/queries/queryemailsubscriptionforeground.php';
        var poststring = 'action=refresh';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(poststring);

        requestcount += 1;

        return;
    }

    function submitsubscriptionemail()
    {

        var localvalue = requestcount;
        var email = document.getElementById('subscriptionemail').value;

        if(email == '' || email == 'E-Mail Address')
        {
            alert('You must enter an e-mail address.');
            return;
        }

        document.getElementById('submitsubscriptiondiv').innerHTML = "<img src='/assets/images/Searching.gif' style='float: left; padding-top: 5px;'>";

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("<EXTRAINSTRUCTIONS>");

                document.getElementById('foregrounddiv').innerHTML = response[0];

                if(response[1])
                {
                    eval(response[1]);
                }

            }


        };

        var url = '/queries/queryemailsubscriptionforeground.php';
        var poststring = 'action=submit&sourcepage=' + domainAbbreviation + '+Search+Page+Popup&email=' + email;

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(poststring);

        requestcount += 1;

        return;

    }


    function hideforegrounddiv()
    {
        document.getElementById('backgrounddiv').style.visibility = 'hidden';
        document.getElementById('foregrounddiv').style.visibility = 'hidden';
        document.getElementById('foregrounddiv').innerHTML = '&nbsp;';
    }

    function checkforentersubscriptionemail(theEvent)
    {
        if (theEvent == null)
        {
            theEvent = window.event;
        }

        if (theEvent.target)
        {
            theTarget = theEvent.target;
        }
        else
        {
            theTarget = theEvent.srcElement;
        }

        if (theEvent.keyCode == 13)
        {
            submitsubscriptionemail();
        }
    }

    function facebookpopup(url)
    {
        var width = 680;
        var height = 400;

        var leftposition = Number((screen.width/2)-(width/2));
        var topposition = Number((screen.height/2)-(height/2));

        window.open(url,'facebookwindow','width=' + width + ',height=' + height + ',resizable=1,toolbar=0,menubar=0,status=0,location=0,left=' + leftposition + ',top=' + topposition);
    }

    function googlepluspopup(url)
    {
        var width = 720;
        var height = 500;

        var leftposition = Number((screen.width/2)-(width/2));
        var topposition = Number((screen.height/2)-(height/2));

        window.open(url,'googlepluswindow','width=' + width + ',height=' + height + ',resizable=1,toolbar=0,menubar=0,status=0,location=0,left=' + leftposition + ',top=' + topposition);
    }

    function checkfacebookcount(sourceurl)
    {
        $.get('https://graph.facebook.com/' + sourceurl + '', function(data) {

            var fbshares = 0;
            var fblikes = 0;
            var fbtotal = 0;

            if ((data.shares != 0) && (data.shares != undefined) && (data.shares != null))
            {
                fbshares = data.shares;
            }

            if ((data.likes != 0) && (data.likes != undefined) && (data.likes != null))
            {
                fblikes = data.likes;
            }

            fbtotal = fbshares + fblikes;

            if(true || fbtotal > 0)
            {
                document.getElementById('facebookcountdiv').style.display = 'inline-block';
                document.getElementById('facebookcount').innerHTML = fbtotal;
            }

        },'jsonp');

    }

    function checkgooglepluscount(sourceurl)
    {

        $.get('/queries/querysocialapis.php?target=googleplus&url=' + sourceurl, function(data) {

            if ((data != 0) && (data != undefined) && (data != null))
            {
                document.getElementById('googlepluscountdiv').style.display = 'inline-block';
                document.getElementById('googlepluscount').innerHTML = data;
            }
        },'html');

    }

    function mouseoverfacebook()
    {
        var targetobject = document.getElementById('facebookimage');
        targetobject.src = '/assets/images/IconFacebookSmall.png';
    }

    function mouseoutfacebook()
    {
        var targetobject = document.getElementById('facebookimage');
        targetobject.src = '/assets/images/IconFacebookSmallGrayscale.png';
    }

    function mouseovergoogleplus()
    {
        var targetobject = document.getElementById('googleplusimage');
        targetobject.src = '/assets/images/IconGooglePlusSmall.png';
    }

    function mouseoutgoogleplus()
    {
        var targetobject = document.getElementById('googleplusimage');
        targetobject.src = '/assets/images/IconGooglePlusSmallGrayscale.png';
    }

    var closetimersearchtypeoptions    = 0;

    function showsearchtypeoptions()
    {
        cancelclosetimersearchtypeoptions();

        document.getElementById('searchtypeoptionsdiv').style.display = 'inline-block';
    }


    function hidesearchtypeoptionstime()
    {
        closetimersearchtypeoptions = window.setTimeout(hidesearchtypeoptions, 250);
    }

    function hidesearchtypeoptions()
    {
        document.getElementById('searchtypeoptionsdiv').style.display = 'none';
    }

    function cancelclosetimersearchtypeoptions()
    {
        if(closetimersearchtypeoptions)
        {
            window.clearTimeout(closetimersearchtypeoptions);
            closetimersearchtypeoptions = null;
        }
    }


    function showcolorchart(targetcolorid,currentcolor,currenturl,flagscroll)
    {
        var localvalue = requestcount;

        var poststring = 'action=showcolors&targetcolorid=' +targetcolorid + '&currentcolor=' + currentcolor + '&currenturl=' + encodeURIComponent(currenturl);

        if(flagscroll == 1)
        {
            var sourceposx, sourceposy;
            var sourceobject = document.getElementById(targetcolorid + 'div');

            if (sourceobject.offsetParent)
            {
                sourceposx = sourceobject.offsetLeft;
                sourceposy = sourceobject.offsetTop;

                while (sourceobject = sourceobject.offsetParent)
                {
                    sourceposx += sourceobject.offsetLeft;
                    sourceposy += sourceobject.offsetTop;
                }
            }


            document.getElementById('sidebarcolordiv').scrollIntoView(true);
            //window.scrollTo(0,sourceposy - 50);
        }

        document.getElementById(targetcolorid + 'chartdiv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block'>";
        document.getElementById(targetcolorid + 'chartdiv').style.display = 'inline-block';

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById(targetcolorid + 'chartdiv').innerHTML = httpobject[localvalue].responseText;
            }


        };

        var url = '/queries/querysearchenginecolorchart.php';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader("content-type", "application/x-www-form-urlencoded");
        httpobject[localvalue].send(poststring);

        //alert(poststring);

        requestcount += 1;


    }

    function highlightcolor(targetcolorid,targetcolor)
    {
        //alert(targetcolorid + ' - ' + targetcolor);
        document.getElementById(targetcolorid + 'div').style.backgroundImage = 'none';
        document.getElementById(targetcolorid + 'div').style.backgroundColor = targetcolor;
    }

    function selectcolor(targetcolorid,targeturl)
    {
        document.getElementById(targetcolorid + 'chartdiv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block'>";
        window.location = targeturl;
    }

    function showcolorcharttop(currenturl)
    {
        var localvalue = requestcount;

        var poststring = 'action=showcolors&currenturl=' + encodeURIComponent(currenturl);

        //alert(poststring);

        document.getElementById('messagediv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; padding-top: 25px; padding-bottom: 25px;'>";
        document.getElementById('messagediv').style.display = 'inline-block';

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById('messagediv').innerHTML = httpobject[localvalue].responseText;
            }


        };

        var url = '/queries/querysearchenginecolorcharttop.php';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader("content-type", "application/x-www-form-urlencoded");
        httpobject[localvalue].send(poststring);

        //alert(poststring);

        requestcount += 1;


    }


    function showShapeOptions(currentUrl)
    {
        var localvalue = requestcount;

        var poststring = 'action=showShapeOptions&currentUrl=' + encodeURIComponent(currentUrl);

        //alert(poststring);

        document.getElementById('messagediv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; padding-top: 25px; padding-bottom: 25px;'>";
        document.getElementById('messagediv').style.display = 'inline-block';

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById('messagediv').innerHTML = httpobject[localvalue].responseText;
            }


        };

        var url = '/queries/querySearchEngineShapeOptions.php';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader("content-type", "application/x-www-form-urlencoded");
        httpobject[localvalue].send(poststring);

        //alert(poststring);

        requestcount += 1;


    }


    function highlightcolortop(targetcolorid,targetcolor)
    {
        //alert(targetcolorid + ' - ' + targetcolor);
        document.getElementById(targetcolorid + 'topdiv').style.backgroundImage = 'none';
        document.getElementById(targetcolorid + 'topdiv').style.backgroundColor = targetcolor;
    }

    function selectcolortop(targetcolorid,targetcolor,targeturl)
    {
        flagcolorselected = true;
        document.getElementById(targetcolorid + 'topdiv').style.backgroundColor = targetcolor;
        document.getElementById(targetcolorid + 'topchartdiv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block'>";
        window.location = targeturl;
    }


    function showdimensionsapplychanges()
    {
        document.getElementById('dimensionsapplychangesdiv').style.display = 'inline-block';
    }

    function showdimensionsapplychangestop()
    {
        document.getElementById('dimensionsapplychangestopdiv').style.display = 'inline-block';
    }

    function dimensionsapplychanges(currenturl)
    {
        var minimumprintwidth = document.getElementById('minimumprintwidth').value;
        var minimumprintheight = document.getElementById('minimumprintheight').value;

        var maximumprintwidth = document.getElementById('maximumprintwidth').value;
        var maximumprintheight = document.getElementById('maximumprintheight').value;

        if(minimumprintwidth > 50 && minimumprintheight > 50)
        {
            alert('Both dimensions can not exceed 48".  Please reduce one of your dimensions to less than 48".');
            return;
        }

        //var newurl = currenturl + '?minimumprintwidth=' + minimumprintwidth + '&minimumprintheight=' + minimumprintheight + '&maximumprintwidth=' + maximumprintwidth + '&maximumprintheight=' + maximumprintheight;
        var newurl = currenturl + '?minimumprintwidth=' + minimumprintwidth + '&minimumprintheight=' + minimumprintheight;

        window.location = newurl;
    }

    function dimensionsapplychangestop(currenturl)
    {
        var minimumprintwidth = document.getElementById('minimumprintwidthtop').value;
        var minimumprintheight = document.getElementById('minimumprintheighttop').value;

        if(minimumprintwidth > 50 && minimumprintheight > 50)
        {
            alert('Both dimensions can not exceed 48".  Please reduce one of your dimensions to less than 48".');
            return;
        }

        //var newurl = currenturl + '?minimumprintwidth=' + minimumprintwidth + '&minimumprintheight=' + minimumprintheight + '&maximumprintwidth=' + maximumprintwidth + '&maximumprintheight=' + maximumprintheight;
        var newurl = currenturl + '?minimumprintwidth=' + minimumprintwidth + '&minimumprintheight=' + minimumprintheight;

        window.location = newurl;
    }

    var touchx0;
    var touchy0;
    var timestamp0;

    var touchxcurrent;
    var touchycurrent;

    function touchcapturestart(evt)
    {
        if(evt.touches)
        {
            timestamp0 = new Date();
            timestamp0 = timestamp0.getTime();

            touchx0 = evt.touches[0].pageX;
            touchy0 = evt.touches[0].pageY;

            touchxcurrent = touchx0;
            touchycurrent = touchy0;
        }
    }

    function touchcapturemove(evt)
    {
        if(evt.touches)
        {
            touchxcurrent = evt.touches[0].pageX;
            touchycurrent = evt.touches[0].pageY;
        }
    }

    function touchcaptureend(evt)
    {
        if(isNaN(touchx0) || isNaN(touchy0) || isNaN(touchxcurrent) || isNaN(touchycurrent))
        {
            return;
        }

        var touchdeltax = touchxcurrent - touchx0;
        var touchdeltay = touchycurrent - touchy0;
        var currenttime = new Date();
        currenttime = currenttime.getTime();

        var touchtimestampdelta = currenttime - timestamp0;

        //alert(touchdeltax + ' - ' + touchdeltay + ' - ' + touchtimestampdelta);

        if(touchdeltax < -100 && Math.abs(touchdeltay) < 100 && touchtimestampdelta < 1500)
        {
            if(document.getElementById('linknext'))
            {
                showswipeinprogress();
                document.getElementById('linknext').click();
            }
        }

        if(touchdeltax > 100 && Math.abs(touchdeltay) < 100 && touchtimestampdelta < 1500)
        {
            if(document.getElementById('linkprevious'))
            {
                showswipeinprogress();
                document.getElementById('linkprevious').click();
            }
        }

    }

    function showswipeinprogress()
    {
        var widthclient = parseInt(document.documentElement.clientWidth);
        var heightclient = parseInt(document.documentElement.clientHeight);

        var widthtarget = 131;
        var heighttarget = 23;

        var offsetleft = 0;
        var offsettop = 0;

        if(true)
        {
            if(document.documentElement.scrollTop && !document.body.scrollTop)
            {
                offsetleft = document.documentElement.scrollLeft;
                offsettop = document.documentElement.scrollTop;
            }
            else
            {
                offsetleft = document.body.scrollLeft;
                offsettop = document.body.scrollTop;
            }
        }
        else
        {
            var sourceobject = document.getElementById('h1title');

            if (sourceobject.offsetParent)
            {
                offsettop = sourceobject.offsetTop;

                while (sourceobject = sourceobject.offsetParent)
                {
                    offsettop += sourceobject.offsetTop;
                }
            }
        }

        if(!document.getElementById('foregrounddiv') || !document.getElementById('backgrounddiv'))
        {

            var newdiv;
            var cssstyle;

            // Background Div
            if(!document.getElementById('backgrounddiv'))
            {
                newdiv = document.createElement('div');
                cssstyle = 'position: fixed; z-index: 5000; left: 0px; top: 0px; width: 10px; height: 10px; background-color: #000000; visibility: hidden; opacity: 0.25; filter: alpha(opacity=25);';
                newdiv.id = 'backgrounddiv';
                newdiv.setAttribute('style',cssstyle);
                newdiv.style.cssText = cssstyle;
                document.body.appendChild(newdiv);
            }

            // Foreground Div
            if(!document.getElementById('foregrounddiv'))
            {
                newdiv = document.createElement('div');
                cssstyle = 'position: fixed; z-index: 5001; left: 0px; top: 0px; width: 10px; min-height: 10px; padding: 0px; overflow: hidden; border: none; background-color: transparent; visibility: hidden; box-shadow: none;';
                newdiv.id = 'foregrounddiv';
                newdiv.setAttribute('style',cssstyle);
                newdiv.style.cssText = cssstyle;
                document.body.appendChild(newdiv);
            }
        }

        var backgroundobject = document.getElementById('backgrounddiv');
        backgroundobject.style.width = '100%';
        backgroundobject.style.height = '100%';
        //backgroundobject.style.visibility = 'visible';

        var foregrounddiv = document.getElementById('foregrounddiv');
        foregrounddiv.style.width = widthtarget + 'px';
        foregrounddiv.style.height = heighttarget + 'px';
        foregrounddiv.style.backgroundColor = 'transparent';
        foregrounddiv.style.border = 'none';
        foregrounddiv.style.boxShadow = 'none';
        foregrounddiv.innerHTML = "<img src='/assets/images/Searching.gif' style='float: left;'>";

        foregrounddiv.style.left = (offsetleft + parseInt((widthclient - widthtarget) / 2)) + 'px';
        foregrounddiv.style.top = (offsettop + parseInt((heightclient - heighttarget) / 2)) + 'px';
        //foregrounddiv.style.top = offsettop + 'px';

        foregrounddiv.style.visibility = 'visible';

    }

    var lastsourcediv = '';
    var lastsourcedropdown = '';
    var lastsourcedropdownclassname = '';

    function showOptions(optionname)
    {
        if(lastsourcediv != '')
        {
            document.getElementById('hiddendivscontainer').appendChild(lastsourcediv);
        }

        var sourcedropdown = document.getElementById('dropdown' + optionname);
        var sourcediv = document.getElementById('hidden' + optionname + 'div');
        var targetdiv = document.getElementById('messagediv');
        //targetdiv.appendChild(sourcediv);

        if(lastsourcedropdownclassname != '')
        {
            lastsourcedropdown.className = lastsourcedropdownclassname;
        }

        if(sourcediv != lastsourcediv)
        {
            targetdiv.style.display = 'none';
        }
        else
        {

        }

        if(targetdiv.style.display == 'none')
        {
            if(sourcedropdown)
            {
                if(sourcedropdown.className != 'customdropdownselected')
                {
                    lastsourcedropdownclassname = sourcedropdown.className;
                }

                sourcedropdown.className = 'customdropdownselected';
                sourcedropdown.focus();
            }
            
            targetdiv.innerHTML = sourcediv.innerHTML;
            targetdiv.style.display = 'inline-block';

            if(optionname == 'colors')
            {
                showcolorcharttop(javascriptCurrentUrl);
            }

            if(optionname == 'collections')
            {
                showAllCollections('initialLoad', '', javascriptCurrentTag, '');
            }

            if(optionname == 'shapes')
            {
                //showShapeOptions(javascriptCurrentUrl);
            }
            
            if(optionname == 'galleries')
            {
                if(document.getElementById('horizontalScrollingArtistCollectionsParentContainerDiv'))
                {
                    document.getElementById('horizontalScrollingArtistCollectionsParentContainerDiv').style.display = 'none';
                }
            }
        }
        else
        {
            if(optionname == 'collections')
            {
                //targetdiv.scrollIntoView(true);
                window.scrollTo(0,0);
            }
            
            targetdiv.style.display = 'none';
          
            if(document.getElementById('horizontalScrollingArtistCollectionsParentContainerDiv'))
            {
                document.getElementById('horizontalScrollingArtistCollectionsParentContainerDiv').style.display = 'inline-block';
            }          
            
        }

        lastsourcediv = sourcediv;
        lastsourcedropdown = sourcedropdown;
    }
    
    function hideOptions()
    {
        document.getElementById('messagediv').style.display = 'none';
    }

    function showSearchCollectionMainProducts()
    {
        var targetDiv = document.getElementById('searchCollectionMainProductsContainerDiv');

        if(targetDiv.style.display == 'none')
        {
            targetDiv.style.display = 'flex';
            document.getElementById('dropdownproducts').className = 'customdropdownhighlighted';
        }
        else
        {
            targetDiv.style.display = 'none';
            document.getElementById('dropdownproducts').className = 'customdropdown';
        }
    }

    function showAllCollections(action, tab, tag, page, targetDivId)
    {
        var localvalue = requestcount;

        if(targetDivId === undefined || targetDivId === '')
        {
            targetDivId = 'messagediv';
        }

        var productType = javascriptUrlProductType;
        var collectionUrl = javascriptUrlCollection;
        
        var postString = 'action=' + action + '&tab=' + tab + '&currentTag=' + encodeURIComponent(tag) + '&currentCollectionUrl=' + collectionUrl + "&page=" + page + "&productType=" + productType + "&targetDivId=" + targetDivId;

        //alert(targetDivId);

        document.getElementById(targetDivId).innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; padding-top: 25px; padding-bottom: 25px;'>";
        document.getElementById(targetDivId).style.display = 'inline-block';

        if(true || page > 1 || action != 'initialLoad')
        {
            document.getElementById(targetDivId).scrollIntoView(true);
        }

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById(targetDivId).innerHTML = httpobject[localvalue].responseText;
                document.getElementById(targetDivId).scrollIntoView(true);
            }


        };

        var url = '/queries/querySearchEngineCollectionsDropDown.php';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader("content-type", "application/x-www-form-urlencoded");
        httpobject[localvalue].send(postString);

        requestcount += 1;
    }

    function toggleNavigationSubjectsProducts()
    {
        var className = document.getElementById('searchEngineNavigationSubjectChildrenProductsContainerDiv').className;
        var newClassName = 'parentLimitChildrenNone';

        if(className == 'parentLimitChildrenNone')
        {
            newClassName = 'parentLimitChildren8';
            document.getElementById('searchEngineNavigationSubjectChildrenProductsContainerDiv').className = newClassName;
            document.getElementById('searchEngineNavigationSubjectChildrenProductsContainerDiv').scrollIntoView(true);
            document.getElementById('navigationSubjectsProducstButtonCaption').innerHTML = 'More Subjects';
            document.getElementById('navigationSubjectsProducstButtonImage').src = '/images/ArrowDownTransparent.png';
        }
        else
        {
            document.getElementById('searchEngineNavigationSubjectChildrenProductsContainerDiv').className = newClassName;
            document.getElementById('navigationSubjectsProducstButtonCaption').innerHTML = 'Collapse';
            document.getElementById('navigationSubjectsProducstButtonImage').src = '/images/ArrowUpTransparent.png';
        }


    }


    function togglecollections()
    {
        //alert(searchcollectiongroupid);

        if(document.getElementById('collectionsexpanddiv').getAttribute('customvisible') != 1)
        {
            document.getElementById('collectionsexpanddiv').setAttribute('customvisible',1);

            document.getElementById('collectionsexpanddiv').style.display = 'none';
            document.getElementById('collectionsbottomdiv').style.display = 'inline-block';
        }
        else
        {
            document.getElementById('collectionsexpanddiv').setAttribute('customvisible',0);

            document.getElementById('collectionsexpanddiv').style.display = 'inline-block';
            document.getElementById('collectionsbottomdiv').style.display = 'none';

            document.getElementById('collectionstopdiv').scrollIntoView(true);
        }

        if(false)
        {
            if(document.getElementById('collectionsexpanddiv').style.display != 'inline-block')
            {
                document.getElementById('collectionsexpanddiv').style.display = 'none';
                document.getElementById('collectionsbottomdiv').style.display = 'inline-block';
            }
            else
            {
                document.getElementById('collectionsexpanddiv').style.display = 'inline-block';
                document.getElementById('collectionsbottomdiv').style.display = 'none';

                document.getElementById('collectionstopdiv').scrollIntoView(true);
            }
        }
    }


    function toggleCollectionsNew(memKey, action)
    {
        var localValue = requestcount;
        var postString = "collectionGroupId=" + memKey + "&action=" + action;

        httpobject[localValue] = newHttpReq();
        httpobject[localValue].onreadystatechange = function(){

            try
            {
                if(httpobject[localValue].readyState == 4)
                {
                }

                if(httpobject[localValue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localValue].readyState == 4 && httpobject[localValue].status == 200)
            {
                document.getElementById('searchEngineCollectionsContainerDiv').scrollIntoView(true);
                document.getElementById('searchEngineCollectionsContainerDiv').innerHTML = httpobject[localValue].responseText;
            }


        };

        document.getElementById('collectionsToggleDiv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block;' alt='Loading' title='Loading'>";

        var url = '/queries/querySearchEngineCollections.php';

        httpobject[localValue].open('post',url,true);
        httpobject[localValue].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpobject[localValue].send(postString);

        requestcount += 1;



        //alert(searchcollectiongroupid);

        if(document.getElementById('collectionsexpanddiv').getAttribute('customvisible') != 1)
        {
            document.getElementById('collectionsexpanddiv').setAttribute('customvisible',1);

            document.getElementById('collectionsexpanddiv').style.display = 'none';
            document.getElementById('collectionsbottomdiv').style.display = 'inline-block';
        }
        else
        {
            document.getElementById('collectionsexpanddiv').setAttribute('customvisible',0);

            document.getElementById('collectionsexpanddiv').style.display = 'inline-block';
            document.getElementById('collectionsbottomdiv').style.display = 'none';

            document.getElementById('collectionstopdiv').scrollIntoView(true);
        }

    }


    function showMoreFromArtist(urlSearchEngineType, urlMedium, urlTag, urlProduct, urlCollection, artworkId, currentPage)
    {
        if(document.getElementById("moreImagesDiv[" + artworkId + "]"))
        {
            hidemorefromartist(artworkId);

            return;
        }

        var newdiv = document.createElement("div");
        newdiv.id = "moreImagesDiv[" + artworkId + "]";
        newdiv.style.display = "inline-block";
        newdiv.style.boxSizing = 'border-box';
        newdiv.style.visibility = "visible";
        newdiv.style.width = "100%";
        //newdiv.style.maxWidth = "400px";
        newdiv.style.overflow = 'hidden';
        newdiv.style.textAlign = "center";
        newdiv.style.borderWidth = '1px';
        newdiv.style.borderStyle = 'solid';
        newdiv.style.borderColor = '#AAAAAA';
        newdiv.style.borderRadius = '0px';
        newdiv.style.padding = '0px';
        newdiv.style.margin = '0px';
        newdiv.style.marginTop = '10px';
        newdiv.style.marginBottom = '25px';
        newdiv.style.boxShadow = '0px 5px 8px #EEEEEE';
        newdiv.innerHTML = "<img style='display: inline-block; padding-top: 15px; padding-bottom: 10px;' src='/assets/images/Searching.gif'>";

        var referencediv = '';
        
        if(document.getElementById("artistNameDiv[" + artworkId + "]"))
        {
            referencediv = document.getElementById("artistNameDiv[" + artworkId + "]");
        }
 
        if(document.getElementById("flowDataDiv[" + artworkId + "]"))
        {
            referencediv = document.getElementById("flowDataDiv[" + artworkId + "]");
        } 
        
        referencediv.parentNode.insertBefore(newdiv, referencediv.nextSibling);

        var localValue = requestcount;
        var localArtworkId = artworkId;
        var postString = "artworkId=" + artworkId + "&urlSearchEngineType=" + urlSearchEngineType + "&urlMedium=" + urlMedium + "&urlTag=" + urlTag + "&urlProduct=" + urlProduct + "&urlCollection=" + urlCollection + "&currentPage=" + currentPage;

        httpobject[localValue] = newHttpReq();
        httpobject[localValue].onreadystatechange = function(){

            try
            {
                if(httpobject[localValue].readyState == 4)
                {
                }

                if(httpobject[localValue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localValue].readyState == 4 && httpobject[localValue].status == 200)
            {
                document.getElementById('moreImagesDiv[' + localArtworkId + ']').innerHTML = httpobject[localValue].responseText;
            }


        };

        var url = '/queries/querySearchEngineMoreImagesNew.php';

        httpobject[localValue].open('post',url,true);
        httpobject[localValue].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpobject[localValue].send(postString);

        requestcount += 1;
    }

    function hidemorefromartist(artworkid)
    {
        if(document.getElementById("moreImagesDiv[" + artworkid + "]"))
        {
            var divtoremove = document.getElementById("moreImagesDiv[" + artworkid + "]");

            divtoremove.parentNode.removeChild(divtoremove);
        }
    }

    function scrolltoartwork(artworkid)
    {
        if(document.getElementById('artworkdiv[' + artworkid + ']'))
        {
            var targetdiv = document.getElementById('artworkdiv[' + artworkid + ']');
            targetdiv.scrollIntoView(true);
        }
    }

    var previousTabId = '';

    function selectProductDetailTab(tabId)
    {
        var availableTabs = document.getElementsByClassName('productDetailTabLink');

        for(i = 0; i < availableTabs.length; i ++)
        {
            var currentTabId = availableTabs[i].id;
            currentTabId = currentTabId.replace("productDetailTabLink[", "");
            currentTabId = currentTabId.replace("]", "");            
            
            if(currentTabId == tabId)
            {
                availableTabs[i].className = 'productDetailTabLink productDetailTabLinkSelected';

                var sourceDivId = 'productDetailDiv[' + currentTabId + ']';

                if(document.getElementById(sourceDivId))
                {
                    document.getElementById(sourceDivId).className = 'productDetailContentDiv productDetailContentDivSelected';
                }
            }
            else
            {
                availableTabs[i].className = 'productDetailTabLink';

                var sourceDivId = 'productDetailDiv[' + currentTabId + ']';

                if(document.getElementById(sourceDivId))
                {
                    document.getElementById(sourceDivId).className = 'productDetailContentDiv';
                }
            }
        }

        if(false && previousTabId == 'video')
        {
            var youtubeVideos = document.getElementsByClassName('productDetailYoutubeVideo');

            for(i = 0; i < youtubeVideos.length; i++)
            {
                var previousSrc = youtubeVideos[i].src;
                youtubeVideos[i].src = '';
                youtubeVideos[i].src = previousSrc;

            }
        }

        previousTabId = tabId;

    }

    function submitDescriptionForm()
    {
        var targetPageDescription = document.getElementById('targetPageDescription').value;

        if(targetPageDescription.length < 200)
        {
            alert('You must enter at least 200 characters.');
            return;
        }

        document.getElementById('targetPageDescriptionForm').submit();
    }

    function countTargetPageDescriptionCharacters()
    {
        var targetPageDescription = document.getElementById('targetPageDescription').value;
        var numCharacters = targetPageDescription.length;

        document.getElementById('targetPageDescriptionNumCharacters').innerHTML = numCharacters;
    }

    function positionPromotionDiv()
    {
        if(document.getElementById('promotiondiv'))
        {
            var elementToMove = document.getElementById('promotiondiv');
            elementToMove.style.display = 'none';
        }
        else
        {
            return;
        }

        var elements = document.getElementsByClassName('searchengineresultdiv');
        var sourceObject;
        var targetObject;
        var sourceId;
        var targetId;
        var currentImagePosition;
        var targetPosition = 7;
        var sourceY = 0;
        var targetY = 0;

        for(var i = 0; i < elements.length; i ++)
        {
            currentImagePosition = elements[i].getAttribute('data-position');

            if(currentImagePosition == targetPosition)
            {
                sourceObject = elements[i];
                sourceId = elements[i].id;

                sourceY = sourceObject.offsetTop;
            }

            if(currentImagePosition > targetPosition)
            {
                targetObject = elements[i];
                targetId = elements[i].id;

                targetY = targetObject.offsetTop;

                if(targetY != sourceY)
                {
                    document.getElementById('searchEngineResultsParentDiv').insertBefore(elementToMove,targetObject);
                    elementToMove.style.display = 'inline-block';

                    return;
                }
            }
        }

    }

    function checkscreenwidth()
    {
        if(screen.width != screenWidth)
        {
            storescreenwidth();
        }
    }

    function scrollToProducts()
    {
        showOptions('products');
        //document.getElementById('messagediv').scrollIntoView(true);

         $('html, body').animate({
                scrollTop: $("#messagediv").offset().top - 20
            }, 500);
    }

    function scrollToCollections()
    {
        if(!document.getElementById('dropDownCollectionsContainerDiv'))
        {
            showOptions('collections');
        }

        //document.getElementById('messagediv').scrollIntoView(true);

         $('html, body').animate({
                scrollTop: $("#messagediv").offset().top - 20
            }, 500);
    }

    function displayAllFilters()
    {
        var availableFilters = document.getElementsByClassName('customdropdowncontainer');

        for(var i = 0; i < availableFilters.length; i ++)
        {
            if(availableFilters[i].id == 'customDropdownSort')
            {
                continue;
            }

            availableFilters[i].style.display = 'inline-block';
        }

        document.getElementById('moreFiltersDiv').style.display = 'none';
    }

    function showAllSubjects(parentSubjectId, navigationSubjectsProductId, urlFilterProductType, urlFilterMedium)
    {
        var localvalue = requestcount;

        var postString = "parentSubjectId=" + parentSubjectId + "&navigationSubjectsProductId=" + navigationSubjectsProductId + "&urlFilterProductType=" + urlFilterProductType + "&urlFilterMedium=" + urlFilterMedium;

        document.getElementById('allSubjectsDiv').style.display = "inline-block";
        document.getElementById('allSubjectsDiv').innerHTML = "<img src='/assets/images/Searching.gif'>";

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById('viewAllSubjectsDiv').style.display = 'none';
                document.getElementById('allSubjectsDiv').innerHTML = httpobject[localvalue].responseText;
            }


        };

        var url = '/queries/querySearchEngineAllSubjects.php';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

    }


    function improveNavigationSubjectImages(action, tag, productId, artworkId)
    {

        var localvalue = requestcount;
        var postString = 'action=' + action + '&tag=' + tag + '&productId=' + productId + '&artworkId=' + artworkId;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                //alert(httpobject[localvalue].responseText);
                alert('The image has been selected.');
            }


        };

        //alert(postString);

        var url = '/queries/queryImproveNavigationSubjectImages.php';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

    }

    function customDropDownCheckForEnter(e)
    {
        if(e.keyCode == 13)
        {
            e.target.click();
        }
    }
    
function searchEngineSearchFocus()
    {
        if(document.getElementById('searchFormSearchEngine'))
        {
            var currentClassName = document.getElementById('searchFormSearchEngine').className;
            if(currentClassName.indexOf('searchFormSearchEngineActivated') == -1)
            {
                var newClassName = currentClassName + ' searchFormSearchEngineActivated';
                document.getElementById('searchFormSearchEngine').className = newClassName;
            }
        }
        
        if(document.getElementById('searchFormSearchEngineSearchTypeDiv'))
        {
            document.getElementById('searchFormSearchEngineSearchTypeDiv').style.display = 'inline-block';
        }

        if(document.getElementById('headerCustomSearchTypeDiv'))
        {
            document.getElementById('headerCustomSearchTypeDiv').style.display = 'inline-block';
        }
    }
    
    function checkForEnterSearchFormSearchEngine(e)
    {
        if (e == null)
        {
            e = window.event;
        }

        if (e.keyCode === 13)
        {
            document.getElementById('searchFormSearchEngine').submit();
        }
    }    
    
    function checkForEmptySearchInput(e)
    {
        if(document.getElementById('searchFormSearchEngineInput').value.length == 0)
        {
            if(document.getElementById('searchFormSearchEngineImageXClearSearch'))
            {
                document.getElementById('searchFormSearchEngineImageXClearSearch').style.display = 'none';
                document.getElementById('searchFormSearchEngineInput').style.marginLeft = '10px';
            }
        }  
    }

    function showSearchTypeOptionsSearchEngine(targetId,triggerMethod)
    {
        triggerMethod = triggerMethod || 'default';

        cancelCloseTimerSearchTypeOptionsSearchEngine();

        if(targetId)
        {
            if(document.getElementById(targetId))
            {
                document.getElementById(targetId).style.display = 'inline-block';

                if(true || triggerMethod == 'keyDown')
                {
                    globalFocusTrap = focusTrap(document.getElementById(targetId),{onDeactivate: hidesearchtypeoptionsheader, clickOutsideDeactivates: true,});
                    globalFocusTrap.activate();
                }

                return;
            }
        }

        document.getElementById('searchTypeOptionsSearchEngineDiv').style.display = 'inline-block';
    }    
    
    function hideSearchTypeOptionsTimeSearchEngine()
    {
        closeTimerSearchTypeOptionsSearchEngine = window.setTimeout(hideSearchTypeOptionsSearchEngine, 250);
    }

    function cancelCloseTimerSearchTypeOptionsSearchEngine()
    {
        if(closeTimerSearchTypeOptionsSearchEngine)
        {
            window.clearTimeout(closeTimerSearchTypeOptionsSearchEngine);
            closeTimerSearchTypeOptionsSearchEngine = null;
        }
    }    
    
    function hideSearchTypeOptionsSearchEngine()
    {
        var elements = document.getElementsByClassName('searchTypeOptionsContainer');

        for(var i = 0; i < elements.length; i ++)
        {
            elements[i].style.display = 'none';
        }

        if(document.getElementById('searchTypeOptionsSearchEngineDiv'))
        {
            document.getElementById('searchTypeOptionsSearchEngineDiv').style.display = 'none';
        }
    }

    function cancelCloseTimerSearchTypeOptionsSearchEngine()
    {
        if(closeTimerSearchTypeOptionsSearchEngine)
        {
            window.clearTimeout(closeTimerSearchTypeOptionsSearchEngine);
            closeTimerSearchTypeOptionsSearchEngine = null;
        }
    }    
    
    function selectSearchTypeSearchEngine(searchTypeId,searchTypeName)
    {
        var elements = document.getElementsByClassName('searchType');

        for(var i = 0; i < elements.length; i ++)
        {
            elements[i].value = searchTypeId;
        }

        var elements = document.getElementsByClassName('searchTypeName');

        for(var i = 0; i < elements.length; i ++)
        {
            elements[i].innerHTML = searchTypeName;
        }

        hideSearchTypeOptionsSearchEngine();
    }

    function toggleSearchEngineNavigation(parentDivId)
    {
        var currentClassName = document.getElementById(parentDivId).className;
        var newClassName = 'searchEngineNavigationElementContainer searchEngineNavigationElementContainerExpanded';
        
        if(currentClassName == newClassName)
        {
            newClassName = 'searchEngineNavigationElementContainer';
        }

        if(parentDivId == 'searchEngineNavigationColorsDiv' && newClassName == 'searchEngineNavigationElementContainer searchEngineNavigationElementContainerExpanded')
        {
            showSearchEngineNavigationColorChart();
        }
        
        if(parentDivId == 'searchEngineNavigationCollectionsDiv')
        {
            var desktopMobile = 'desktop';
            var targetDivId = '';
            var navigationPosition = getComputedStyle(document.getElementById('searchEngineNavigationDiv')).getPropertyValue('position');
            
            if(navigationPosition == 'absolute')
            {
                desktopMobile = 'mobile';
                targetDivId = 'searchEngineNavigationCollectionsContainer';
            }

            if(newClassName == 'searchEngineNavigationElementContainer searchEngineNavigationElementContainerExpanded')
            {
                showAllCollections('initialLoad', '', javascriptCurrentTag, '', targetDivId);
                
                if(false && desktopMobile == 'desktop')
                {
                    newClassName = 'searchEngineNavigationElementContainer';
                }
            }
            else
            {
                hideOptions();
                
                document.getElementById('searchEngineNavigationCollectionsContainer').style.display = '';
                document.getElementById('searchEngineNavigationCollectionsContainer').innerHTML = '';
                
                if(desktopMobile == 'mobile')
                {
                    document.getElementById(parentDivId).scrollIntoView(true);
                }
            }
        }

        document.getElementById(parentDivId).className = newClassName;
        
    }
    

    function showSearchEngineNavigationColorChart()
    {
        var localvalue = requestcount;
        
        var postString = 'action=showcolors&currenturl=' + encodeURIComponent(javascriptCurrentUrl);

        document.getElementById('searchEngineNavigationColorsContainer').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; padding-top: 25px; padding-bottom: 25px;'>";

        httpobject[localvalue] = newHttpReq();          
        httpobject[localvalue].onreadystatechange = function(){
        
            try 
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }
            
                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }
            
            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById('searchEngineNavigationColorsContainer').innerHTML = httpobject[localvalue].responseText;
            }
        
        
        };      
        
        var url = '/queries/querySearchEngineNavigationColorChart.php'; 

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader("content-type", "application/x-www-form-urlencoded");
        httpobject[localvalue].send(postString);        

        requestcount += 1;  


    }   

    
    function showNavigationDimensionsApplyChanges()
    {
        document.getElementById('searchEngineNavigationDimensionsApplyChangesDiv').style.display = 'inline-block';
    }

    function searchEngineNavigationDimensionsApplyChanges(currentUrl)
    {
        var minimumPrintWidth = document.getElementById('navigationMinimumPrintWidth').value;
        var minimumPrintHeight = document.getElementById('navigationMinimumPrintHeight').value;
        
        if(minimumPrintWidth > 50 && minimumPrintWidth > 50)
        {
            alert('Both dimensions can not exceed 48".  Please reduce one of your dimensions to less than 48".');
            return;
        }

        var newUrl = currentUrl + '?minimumprintwidth=' + minimumPrintWidth + '&minimumprintheight=' + minimumPrintHeight;
        
        window.location = newUrl;
    }   
    
    function searchEngineNavigationShowAllSubjects(parentSubjectId, navigationSubjectsProductId, urlFilterProductType, urlFilterMedium)
    {
        var localvalue = requestcount;

        var postString = "parentSubjectId=" + parentSubjectId + "&navigationSubjectsProductId=" + navigationSubjectsProductId + "&urlFilterProductType=" + urlFilterProductType + "&urlFilterMedium=" + urlFilterMedium;

        document.getElementById('searchEngineAllSubjectsDiv').style.display = "inline-block";
        document.getElementById('searchEngineAllSubjectsDiv').innerHTML = "<img src='/assets/images/Searching.gif'>";

        httpobject[localvalue] = newHttpReq();          
        httpobject[localvalue].onreadystatechange = function(){
        
            try 
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }
            
                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }
            
            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById('searchEngineViewAllSubjectsDiv').style.display = 'none';
                document.getElementById('searchEngineAllSubjectsDiv').style.display = 'inline-block';
                document.getElementById('searchEngineAllSubjectsDiv').innerHTML = httpobject[localvalue].responseText;

            }
        
        
        };      
        
        var url = '/queries/querySearchEngineNavigationAllSubjects.php';    

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);        
        
        requestcount += 1;      
    
    }

    function toggleSearchEngineNavigationMenu(targetState)
    {
        var containers = document.getElementsByClassName('container');
        
        if(targetState === undefined)
        {
            if(document.getElementById('searchEngineNavigationDiv').style.display != 'inline-block')
            {
                targetState = 'showMenu';
            }
            else
            {
                targetState = 'hideMenu';
            }
        }
        
        if(targetState == 'showMenu')
        {
            window.scrollTo(0, 0);
            
            var body = document.body;
            var html = document.documentElement;

            var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            height = height + 'px';

            document.getElementById('searchEngineNavigationDiv').style.display = 'inline-block';
            document.getElementById('searchEngineNavigationDiv').style.height = height;
            
            document.getElementById('searchEngineNavigationBackgroundDiv').style.display = 'inline-block';
            document.getElementById('searchEngineNavigationBackgroundDiv').style.width = '100%';
            document.getElementById('searchEngineNavigationBackgroundDiv').style.height = '100%';
        }
        else
        {
            document.getElementById('searchEngineNavigationDiv').style.display = '';
            document.getElementById('searchEngineNavigationDiv').style.height = '';
            document.getElementById('searchEngineNavigationBackgroundDiv').style.width = '0%';
            document.getElementById('searchEngineNavigationBackgroundDiv').style.display = 'none';      
        }
    }
    
    function searchEngineNavigationSearchFocus()
    {
        var currentClassName = document.getElementById('searchEngineNavigationSearchForm').className;
        var additionalClassName = 'searchEngineNavigationSearchFormSelected';
        
        if(currentClassName.indexOf(additionalClassName) == -1)
        {
            document.getElementById('searchEngineNavigationSearchForm').className += ' ' + additionalClassName;
        }
        
        document.getElementById('searchEngineNavigationSearchTypeDiv').style.display = 'inline-block';

    }
    
    function selectSearchEngineNavigationSearchType(searchType)
    {
        var newSearchType = searchType;
        var newSearchTypeName = document.getElementById('searchEngineSearchType-' + searchType).innerHTML;
        
        document.getElementById('searchEngineNavigationSearchType').value = searchType;
        document.getElementById('searchEngineNavigationSearchTypeName').innerHTML = newSearchTypeName;
        
        toggleSearchEngineNavigation('searchEngineNavigationSearchTypeDiv');
        document.getElementById('searchEngineNavigationSearchInput').focus();
    }
    
    function captureScrollPosition()
    {
        var widthclient = parseInt(document.documentElement.clientWidth);
        var heightclient = parseInt(document.documentElement.clientHeight);

        if(document.getElementById('filtersBottomContainerOuterDiv'))
        {
            var sourcePosY = 0;
            var sourceObject = document.getElementById('filtersContainerOuterDiv');
            var currentClassName = document.getElementById('filtersBottomContainerOuterDiv').className;
            
            if (sourceObject.offsetParent) 
            {
                sourcePosY = sourceObject.offsetTop;
            
                while (sourceObject = sourceObject.offsetParent)
                {
                    sourcePosY += sourceObject.offsetTop;
                }
            }

            var scrollY = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;
            
            if(scrollY == 0)
            {
                scrollY = document.body.scrollTop;
            }

            if(scrollY > sourcePosY + 200)
            {
                if(currentClassName != 'filtersScrollDown')
                {
                    document.getElementById('filtersBottomContainerOuterDiv').className = 'filtersScrollDown';
                }
            }
            else
            {
                if(currentClassName != '')
                {
                    document.getElementById('filtersBottomContainerOuterDiv').className = '';
                }
            }
        }

    }
    
    function changePage()
    {
        var targetUrl = document.getElementById('selectPage').options[document.getElementById('selectPage').selectedIndex].value;
        window.location = targetUrl;
    }
    
    function returnToTop()
    {
        $('html, body').animate({scrollTop:0}, 'slow');
    }
    
    function selectDepartment(selectedDepartmentId)
    {
        var availableDepartmentButtons = document.getElementById('searchEngineNavigationDepartmentDiv').getElementsByClassName('searchEngineNavigationOption');

        var newClassName = '';
        var currentDepartmentId = '';
        var selectedDepartmentName = '';
        
        for(i = 0; i < availableDepartmentButtons.length; i ++)
        {
            currentDepartmentId = availableDepartmentButtons[i].getAttribute('data-department-id');

            newClassName = 'searchEngineNavigationOption';
            
            if(currentDepartmentId == selectedDepartmentId)
            {
                selectedDepartmentName = availableDepartmentButtons[i].getAttribute('data-department-name');
                newClassName += ' searchEngineNavigationOptionSelected';
            }
            
            availableDepartmentButtons[i].className = newClassName;
           
        }
        
        var availableDepartmentProductGroups = document.getElementById('searchEngineNavigationProductDiv').getElementsByClassName('searchEngineNavigationDepartmentProducts');

        for(i = 0; i < availableDepartmentProductGroups.length; i ++)
        {
            currentDepartmentId = availableDepartmentProductGroups[i].getAttribute('data-department-id');

            newClassName = 'searchEngineNavigationDepartmentProducts';
            
            if(currentDepartmentId == selectedDepartmentId || selectedDepartmentId == 'popular')
            {
                newClassName += ' searchEngineNavigationDepartmentProductsSelected';
                
                if(selectedDepartmentId == 'popular')
                {
                    newClassName += ' searchEngineNavigationDepartmentShowAllProducts';
                }
                
            }
                        
            availableDepartmentProductGroups[i].className = newClassName;
           
        }        
        
        
        document.getElementById('searchEngineNavigationSelectedDepartmentName').innerHTML = selectedDepartmentName;
        document.getElementById('searchEngineNavigationSelectedProductName').innerHTML = 'All';
        
        toggleSearchEngineNavigation('searchEngineNavigationDepartmentDiv');
        
        document.getElementById('searchEngineNavigationProductDiv').className = 'searchEngineNavigationElementContainer searchEngineNavigationElementContainerExpanded';

    }
    
    function detectResize()
    {
        var desktopMobile = 'desktop';
        
        positionPromotionDiv();

        if(document.getElementById('searchEngineNavigationDiv'))
        {
            var navigationPosition = getComputedStyle(document.getElementById('searchEngineNavigationDiv')).getPropertyValue('position');

            if(navigationPosition == 'absolute')
            {
                desktopMobile = 'mobile';
            }     
          
            if(desktopMobile == 'desktop')
            {
                toggleSearchEngineNavigationMenu('hideMenu');
            }
        }
    }
    
    //window.onscroll = captureScrollPosition;
    window.addEventListener("scroll", captureScrollPosition);
    window.addEventListener("resize", detectResize);