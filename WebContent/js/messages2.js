function tosca_remove(dom_id) {
	new Effect.Fade(dom_id,{duration:0.5});
	setTimeout(function() {
		Element.remove(dom_id);
    }, 500);
}

function tosca_reset(dom_id) {
	setTimeout(function() {
		$(dom_id).value = '';
    }, 1);
}


function tosca_toggle_comment(div_id) {
	if ($(div_id).hasClassName('collapsed')) {
		$(div_id).removeClassName('collapsed');
	} else {
		$(div_id).addClassName('collapsed');
	}
}

function tosca_expand_all_comments() {
 $$('div.comment-container').invoke('removeClassName', 'collapsed');
}

function tosca_collapse_all_comments() {
	var tabComment = $$('div.comment-container');
	var tabSliced = tabComment.slice(1, tabComment.length - 1);
	tabSliced.invoke('addClassName', 'collapsed');
}

function tosca_generate_hash(id) {
  var now = new Date().getTime();
  var rand = Math.random() * now;
  var text = 'tosca' + now + rand;
  $(id).value = hex_md5(text);
  return true;
}

// Coming from Redmine,
var fileFieldCount = 1;

function addFileField() {
    if (fileFieldCount >= 10 || (nbFileAttached != fileFieldCount)) return false
    fileFieldCount++;
    var f = document.createElement("input");
    f.type = "file";
    f.name = "attachments[" + fileFieldCount + "][file]";
    f.size = 45;
	f.writeAttribute("onchange", "getFile(this.value)");

    p = document.getElementById("attachments_fields");
    p.appendChild(document.createElement("br"));
    p.appendChild(f);
}


var fileAttached = null;
var nbFileAttached = 0;

function getFile(attach)
{
	fileAttached = attach;
	nbFileAttached += 1;
}

function check_attachement(id)
{
	var description_content = $(id).$("tinymce").innerHTML;
	/*You can complete the tab with other matching values*/
	var matchingtab = ["ci-joint", "piece jointe"];
	var i = 0;
	if (description_content != null)
	{
		while (i < matchingtab.length)
		{
			var reg = new RegExp(matchingtab[i], "gi");
			if (description_content.match(reg) && fileAttached == null)
			{
				alert("Vous avez oublie votre piece jointe ?");
				return false;
			}
			i++;
		}
		return true;
	}
}

function check_comment(id, statut_id)
{
	var comment_content = $(id).$("tinymce").innerHTML;
	var statutid = $(statut_id).options[document.getElementById(statut_id).selectedIndex].value;
	var regp = new RegExp("^<p><br mce_bogus=\"1\"></p>$", "i");

	if (comment_content.match(regp) && statutid == "")
		return false;
	return true;
}

function tosca_display_comments() {
	 $$('div.thread-post').invoke('removeClassName', 'collapsed-completely');	
	 $$('div#open-collapsed').invoke('addClassName', 'collapsed-completely');
}


function tosca_display_comment(div_id) {
	if ($(div_id).hasClassName('collapsed')) {
		$(div_id).removeClassName('collapsed');
	}
}

function tosca_show_preview(div_id) {
	var s=document.getElementById(div_id);
	var elements=getElementsByClassName('thread-post-message-content', s);
	var element=elements[0];
	var elementvalue = extract_value(element, elementvalue);
	//Add your filter code or validation rule here.
	elementvalue = elementvalue.replace(/\s+/g," ");
	elementvalue = elementvalue.replace(/^\s*|\s*$/,"");
	elementvalue = elementvalue.replace(/\n+/g," ");
	if (elementvalue.length > 85) {
			elementvalue = elementvalue.substring(0,84) + "...";
	}
	getElementsByClassName('preview', s)[0].innerHTML=elementvalue;
}

function extract_value(element) {
	var elementvalue = "";
	var nodes = element.childNodes;
	for ( var int = 0; int < nodes.length; int++) {
		var child = nodes[int];
		if (child.textContent != null) {
			elementvalue += child.textContent;
		}
	}
	return elementvalue;
}

function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
}

tosca_show_preview('comment_8059');
tosca_show_preview('comment_8060');
tosca_show_preview('comment_8061');
tosca_show_preview('comment_8062');
tosca_show_preview('comment_8063');
tosca_show_preview('comment_8064');
