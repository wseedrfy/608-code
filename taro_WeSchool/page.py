p = ["view",  "navigator" ,"scroll-view", "label" ,"form" ,"span", "switch", "picker"]

p1 = ["images", "text", "input" ,  "block" ,  "button"  ]

b = ''

html = ""
for  index, b in enumerate(p) :

    for i in range(1,5):
        html += '''
    <template name="test-''' + b +  str(i) + '''">
    <'''+b+''' style="{{item.style}}" class="{{item.class}}" catchtap="{{'undefined'?'':item.bindtap}}">
        <text>{{item.text}}</text>
        <block wx:for="{{item.child}}" wx:for-item="childItem">
        <template is="{{ 'test-'+childItem.type+(deep+1) }}" data="{{ item:childItem, deep:deep+1 }}"></template>
        </block>
    </'''+b+'''>
    </template>
    '''

for  index, b in enumerate(p1) :

    for i in range(1,5):
        html += '''
    <template name="test-''' + b +  str(i) + '''">
        <'''+b+''' style="{{item.style}}" class="{{item.class}}" catchtap="{{'undefined'?'':item.bindtap}}">
            <text>{{item.text}}</text>
        </'''+b+'''>
    </template>
    '''

print(html)

f = "lucky.html"


with open(f,"w") as f:   #”w"代表着每次运行都覆盖内容

    f.write(html)
