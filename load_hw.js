layout = $('.mdl-layout-content')
$.ajax('/hw/list.json', {
    complete: (xhr, stat) => {
        if (stat != 'success') {
            console.error(stat);
            return;
        }
        window.list_of_predmets = JSON.parse(xhr.responseText);
        console.log(window.list_of_predmets.length)
        $.ajax('/card.tmp', {
            complete: (xhr, stat) => {
                if (stat != 'success') {
                    console.error(stat);
                    return;
                }
                template = xhr.responseText;
                for (window.i = window.list_of_predmets.length - 1; i >= 0; i--) {
                    $.ajax('/hw/' + window.list_of_predmets[window.i] + '/desc', {
                        complete: (xhr, stat) => {
                            if (stat != 'success') {
                                console.error(stat)
                                return
                            }
                            description = xhr.responseText
                            $.ajax('/hw/' + window.list_of_predmets[window.i] + '/name', {
                                complete: (xhr, stat) => {
                                    if (stat != 'success') {
                                        console.error(stat)
                                        return
                                    }
                                    name = xhr.responseText
                                    card = template.replace('TYPE', window.list_of_predmets[window.i]).replace('TEXT', description).replace('NAME', name)
                                    layout.append(card)
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})