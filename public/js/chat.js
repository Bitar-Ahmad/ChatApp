var socket = io();

  function scrollToBottom () {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    var sex = jQuery('#messages').prop('clientHeight');

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    };
   };


  socket.on('connect', function () {
    console.log('connected to server');
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server!');
  });

  socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var formattedTime  = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
      text:message.text,
      from:message.from,
      createdAt:formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    // console.log('New message', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage', function (message) {
    var formattedTime  = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
      from:message.from,
      createdAt:formattedTime,
      url:message.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    // li.text(`${message.from}: ${formattedTime} `);
    // a.attr('href', message.url)
    // li.append(a);
    // jQuery('#messages').append(li);
  });

  jQuery('#message-form').on('submit',  function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
      from:'User',
      text:messageTextbox.val()
    }, function () {
      messageTextbox.val('');
    });
  });

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('GeoLoaction not supported by your browser!');
  }

  locationButton.attr('disabled', 'disabled').text('sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Share location');
    socket.emit('createLocationMessage', {
      lat:position.coords.latitude,
      lng:position.coords.longitude
    });

  }, function () {
    locationButton.removeAttr('disabled');
    alert('Able to fetch location but ne nori!');
  });
});
